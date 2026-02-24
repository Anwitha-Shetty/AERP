import { useEffect, useState } from "react";
import AdminSidebar from "../../../components/AdminSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import mainConfig from "../../../config/mainConfig";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FiInfo, FiSave, FiUsers } from "react-icons/fi";
import {
  createVender,
  fetchVenderTypes,
  fetchCurrencies,
  fetchCountries,
  fetchStates,
  fetchCities,
  fetchUsers,
  fetchCompanies,
} from "../../../store/slices/vendorSlice";
import { useDispatch, useSelector } from "react-redux";

const CreateVendor = () => {
  const dispatch = useDispatch();
  const {
    vendortypes,
    currencies,
    countries,
    states,
    cities,
    users,
    companies,
  } = useSelector((state) => state.vendors);

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [actionType, setActionType] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const [message, setMessage] = useState({ text: "", type: "" });

  const showTemporaryMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const [formData, setFormData] = useState({
    vendor_name: "",
    vendor_code: "",
    short_name: "",
    vendor_type: "",
    contact_person: "",
    email: "",
    phone: "",
    mobile: "",
    website: "",
    billing_address: "",
    shipping_address: "",
    country: "",
    state: "",
    city: "",
    postal_code: "",
    currency: "",
    default_lead_time_days: "",
    minimum_order_value: "",
    is_active: "",
    is_blacklisted: "",
    is_approved_by_cfo: "",
    is_validated: "",
    remarks: "",
    creator: "",
    company: "",
  });

  useEffect(() => {
    dispatch(fetchVenderTypes());
    dispatch(fetchCurrencies());
    dispatch(fetchCountries());
    dispatch(fetchStates());
    dispatch(fetchCities());
    dispatch(fetchUsers());
    dispatch(fetchCompanies());
  }, [dispatch]);

  const findPathInMenu = (menu, targetPath, parents = []) => {
    for (let item of menu) {
      const newParents = [...parents, item];
      if (item.path === targetPath) return newParents;
      if (item.subMenu) {
        const result = findPathInMenu(item.subMenu, targetPath, newParents);
        if (result) return result;
      }
    }
    return null;
  };

  useEffect(() => {
    const basePath = location.pathname;
    const menuPath = findPathInMenu(mainConfig, basePath) || [];
    const breadcrumbArray = menuPath.map((i) => ({
      label: i.label,
      path: i.path,
    }));
    if (actionType === "Save")
      breadcrumbArray.push({ label: "Save", path: null });
    setBreadcrumbs(breadcrumbArray);
  }, [location.pathname, actionType]);

  const currentIndex = breadcrumbs.findIndex(
    (b) => b.path === location.pathname,
  );

  const goPrev = () => {
    if (currentIndex > 0 && breadcrumbs[currentIndex - 1].path) {
      navigate(breadcrumbs[currentIndex - 1].path);
    }
  };

  const goNext = () => {
    if (
      currentIndex >= 0 &&
      currentIndex < breadcrumbs.length - 1 &&
      breadcrumbs[currentIndex + 1].path
    ) {
      navigate(breadcrumbs[currentIndex + 1].path);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionType("Save");

    if (
      !formData.vendor_name ||
      !formData.vendor_code ||
      !formData.short_name ||
      !formData.vendor_type ||
      !formData.currency ||
      !formData.country ||
      !formData.state ||
      !formData.city ||
      !formData.postal_code ||
      !formData.creator ||
      !formData.company
    ) {
      showTemporaryMessage("Please fill in all required fields!", "error");
      setTimeout(() => setActionType(""), 3000);
      return;
    }

    const submitData = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        submitData.append(key, formData[key]);
      }
    });

    try {
      const res = await dispatch(createVender(submitData)).unwrap();
      if (res.status === 200 || res.status === 201) {
        showTemporaryMessage("Vendor created successfully!", "success");
      } else if (res.status === 202) {
        showTemporaryMessage("Vendor create accepted!", "success");
      } else {
        showTemporaryMessage("Unexpected response from server.", "error");
        return;
      }
      setFormData({
        vendor_name: "",
        vendor_code: "",
        short_name: "",
        vendor_type: "",
        contact_person: "",
        email: "",
        phone: "",
        mobile: "",
        website: "",
        billing_address: "",
        shipping_address: "",
        country: "",
        state: "",
        city: "",
        postal_code: "",
        currency: "",
        default_lead_time_days: "",
        minimum_order_value: "",
        is_active: "",
        is_blacklisted: "",
        is_approved_by_cfo: "",
        is_validated: "",
        remarks: "",
        creator: "",
        company: "",
      });
    } catch (error) {
      console.log("Error:", error);

      let errorMessages = [];

      if (error?.data) {
        const data = error.data;

        Object.keys(data).forEach((key) => {
          const value = data[key];

          if (Array.isArray(value)) {
            value.forEach((msg) => errorMessages.push(msg));
          } else if (typeof value === "string") {
            errorMessages.push(value);
          }
        });
      }

      if (errorMessages.length > 0) {
        errorMessages.forEach((msg, i) => {
          setTimeout(() => {
            showTemporaryMessage(msg, "error");
          }, i * 600);
        });
      } else {
        showTemporaryMessage("Failed to create vendor!", "error");
      }
    }

    setTimeout(() => setActionType(""), 3000);
  };

  return (
    <div className="flex h-screen">
      <div className="hidden lg:block fixed top-0 left-0 h-full w-[325px] z-40">
        <AdminSidebar />
      </div>

      <main className="flex-1 ml-0 lg:ml-[325px] mt-[145px] p-6 overflow-y-auto bg-white backdrop-blur-sm shadow-inner [&::-webkit-scrollbar]:hidden scrollbar-none">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-400 flex items-center gap-2">
            {breadcrumbs.map((b, index) => (
              <span key={index} className="flex items-center gap-1">
                {b.path ? (
                  <span
                    onClick={() => navigate(b.path)}
                    className="cursor-pointer"
                  >
                    {b.label}
                  </span>
                ) : (
                  <span>{b.label}</span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <span className="text-gray-400"> &gt; </span>
                )}
              </span>
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center">
            <button
              onClick={goPrev}
              className={`text-gray-400 text-lg ${
                currentIndex <= 0
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              disabled={currentIndex <= 0}
            >
              <MdKeyboardArrowLeft />
            </button>
            <button
              onClick={goNext}
              className={`text-gray-400 text-lg ${
                currentIndex >= breadcrumbs.length - 1
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              disabled={currentIndex >= breadcrumbs.length - 1}
            >
              <MdKeyboardArrowRight />
            </button>
          </div>
        </div>

        <div className="flex-1 w-full rounded-md">
          <div className="flex justify-between gap-4">
            <div className="w-full">
              <div className="bg-white rounded">
                <form>
                  <div className="animate-fadeIn rounded border border-gray-200">
                    <div className="px-6 flex justify-between items-center border-b-2 border-gray-200">
                      <div className="flex items-center gap-2 mt-4 pb-1">
                        <FiUsers className="text-amber-400 text-lg" />
                        <h2 className="text-lg font-semibold text-gray-700">
                          Create Vendor
                        </h2>
                      </div>

                      <button
                        onClick={handleSubmit}
                        className="px-3 py-1.5 cursor-pointer bg-amber-400 rounded h-8 text-black flex items-center gap-1 justify-center transition"
                      >
                        <FiSave /> Save
                      </button>
                    </div>

                    <div className="max-h-[255px] rounded overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-none">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 px-6 my-4">
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Vendor Code <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="vendor_code"
                            placeholder="Enter Vendor Code"
                            value={formData.vendor_code}
                            onChange={handleChange}
                            className="flex-1 w-full form-input"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Short Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="short_name"
                            placeholder="Enter Short Name"
                            value={formData.short_name}
                            onChange={handleChange}
                            className="flex-1 w-full form-input"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Vendor Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="vendor_name"
                            placeholder="Enter Vendor Name"
                            value={formData.vendor_name}
                            onChange={handleChange}
                            className="flex-1 w-full form-input"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Vendor Type <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="vendor_type"
                            value={formData.vendor_type}
                            onChange={handleChange}
                            className="flex-1 w-full form-input"
                          >
                            <option value="">Select</option>
                            {vendortypes.map((vt) => (
                              <option key={vt.id} value={vt.id}>
                                {vt.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Contact Person
                          </label>
                          <input
                            type="text"
                            name="contact_person"
                            placeholder="Enter Contact Person"
                            value={formData.contact_person}
                            onChange={handleChange}
                            className="flex-1 w-full form-input"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Email ID
                          </label>
                          <input
                            type="email"
                            name="email"
                            placeholder="Enter Email ID"
                            value={formData.email}
                            onChange={handleChange}
                            className="flex-1 w-full form-input"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Phone
                          </label>
                          <input
                            type="text"
                            name="phone"
                            placeholder="Enter Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            maxLength={10}
                            className="flex-1 w-full form-input"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Mobile No
                          </label>
                          <input
                            type="text"
                            name="mobile"
                            placeholder="Enter Mobile No"
                            value={formData.mobile}
                            onChange={handleChange}
                            maxLength={10}
                            className="flex-1 w-full form-input"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Website
                          </label>
                          <input
                            type="url"
                            name="website"
                            placeholder="Enter Website URL"
                            value={formData.website}
                            onChange={handleChange}
                            className="flex-1 w-full form-input"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Active
                          </label>
                          <select
                            name="is_active"
                            value={formData.is_active}
                            onChange={handleChange}
                            className="flex-1 w-full form-input"
                          >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                        <div className="flex items-start col-span-2">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Billing Address
                          </label>
                          <textarea
                            name="billing_address"
                            value={formData.billing_address}
                            onChange={handleChange}
                            rows={2}
                            className="flex-1 w-full textarea-input"
                            placeholder="Enter billing address..."
                          ></textarea>
                        </div>
                        <div className="flex items-start col-span-2">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Shipping Address
                          </label>
                          <textarea
                            name="shipping_address"
                            value={formData.shipping_address}
                            onChange={handleChange}
                            rows={2}
                            className="flex-1 w-full textarea-input"
                            placeholder="Enter shipping address..."
                          ></textarea>
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Currency <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                            className="flex-1 w-full form-input"
                          >
                            <option value="">Select</option>
                            {currencies.map((cr) => (
                              <option key={cr.id} value={cr.id}>
                                {cr.currency_code} - {cr.currency_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Country <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="flex-1 w-full form-input"
                          >
                            <option value="">Select</option>
                            {countries.map((ct) => (
                              <option key={ct.id} value={ct.id}>
                                {ct.country_code} - {ct.country_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            State <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="flex-1 w-full form-input"
                          >
                            <option value="">Select</option>
                            {states.map((st) => (
                              <option key={st.id} value={st.id}>
                                {st.state_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            City <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="flex-1 w-full form-input"
                          >
                            <option value="">Select</option>
                            {cities.map((cs) => (
                              <option key={cs.id} value={cs.id}>
                                {cs.city_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Postal Code <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="postal_code"
                            placeholder="Enter Postal Code"
                            value={formData.postal_code}
                            onChange={handleChange}
                            className="flex-1 w-full form-input"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Lead Time
                          </label>
                          <input
                            type="number"
                            name="default_lead_time_days"
                            placeholder="eg. 1"
                            value={formData.default_lead_time_days}
                            min="0"
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "" || /^\d+$/.test(value)) {
                                handleChange(e);
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "-" || e.key === "e") {
                                e.preventDefault();
                              }
                            }}
                            className="flex-1 w-full form-input"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Minimum Order Value
                          </label>
                          <input
                            type="number"
                            name="minimum_order_value"
                            placeholder="Enter Minimum Order Value"
                            value={formData.minimum_order_value}
                            min="0"
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "" || /^\d+$/.test(value)) {
                                handleChange(e);
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "-" || e.key === "e") {
                                e.preventDefault();
                              }
                            }}
                            className="flex-1 w-full form-input"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Blacklisted
                          </label>
                          <select
                            name="is_blacklisted"
                            value={formData.is_blacklisted}
                            onChange={handleChange}
                            className="flex-1 w-full form-input"
                          >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Approved By CFO
                          </label>
                          <select
                            name="is_approved_by_cfo"
                            value={formData.is_approved_by_cfo}
                            onChange={handleChange}
                            className="flex-1 w-full form-input"
                          >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Validated
                          </label>
                          <select
                            name="is_validated"
                            value={formData.is_validated}
                            onChange={handleChange}
                            className="flex-1 w-full form-input"
                          >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Creator <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="creator"
                            value={formData.creator}
                            onChange={handleChange}
                            className="flex-1 w-full form-input"
                          >
                            <option value="">Select</option>
                            {users.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.username} - {user.email}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Company <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="flex-1 w-full form-input"
                          >
                            <option value="">Select</option>
                            {companies.map((cp) => (
                              <option key={cp.id} value={cp.id}>
                                {cp.company_code} - {cp.company_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-start col-span-2">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Remarks
                          </label>
                          <textarea
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleChange}
                            rows={2}
                            className="flex-1 w-full textarea-input"
                            placeholder="Enter remarks..."
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {message.text && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full px-6">
            <div
              className={`flex items-center gap-2 text-sm px-4 py-2 rounded border shadow-lg ${
                message.type === "success"
                  ? "text-green-700 border-green-200 bg-green-50"
                  : "text-red-700 border-red-200 bg-red-50"
              }`}
            >
              <FiInfo
                className={`${
                  message.type === "success" ? "text-green-700" : "text-red-700"
                }`}
              />
              <span>{message.text}</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CreateVendor;
