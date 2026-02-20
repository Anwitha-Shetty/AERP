import { useEffect, useState } from "react";
import AdminSidebar from "../../../components/AdminSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import mainConfig from "../../../config/mainConfig";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FiInfo, FiSave, FiUsers } from "react-icons/fi";
import {
  createVenderKYC,
  fetchVenders,
  fetchVenderTypes,
  fetchCountries,
  fetchKYCStatus,
  fetchApprovedBy,
  fetchUsers,
  fetchCompanies,
} from "../../../store/slices/vendorKYCSlice";
import { useDispatch, useSelector } from "react-redux";

const CreateVendorKYC = () => {
  const dispatch = useDispatch();
  const {
    vendors,
    vendortypes,
    countries,
    kycstatus,
    approvedby,
    users,
    companies,
  } = useSelector((state) => state.vendorKYC);

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
    vendor: "",
    payment_terms: "",
    credit_days: "",
    credit_limit: "",
    legal_name: "",
    trade_name: "",
    vendor_type: "",
    registration_number: "",
    incorporation_date: "",
    country_of_registration: "",
    tax_id: "",
    vat_number: "",
    tax_certificate: null,
    is_msme: "",
    msme_certificate: null,
    bank_name: "",
    account_holder_name: "",
    account_number: "",
    ifsc_swift_code: "",
    bank_branch: "",
    bank_proof: null,
    registered_address: "",
    operational_address: "",
    official_email: "",
    phone_number: "",
    signatory_name: "",
    signatory_designation: "",
    signatory_email: "",
    signatory_phone: "",
    nda_signed: "",
    contract_signed: "",
    is_blacklisted: "",
    risk_rating: "",
    kyc_status: "",
    approved_at: "",
    approved_by: "",
    creator: "",
    company: "",
  });

  useEffect(() => {
    dispatch(fetchVenders());
    dispatch(fetchVenderTypes());
    dispatch(fetchCountries());
    dispatch(fetchKYCStatus());
    dispatch(fetchApprovedBy());
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
      !formData.vendor ||
      !formData.legal_name ||
      !formData.registration_number ||
      !formData.bank_name ||
      !formData.account_holder_name ||
      !formData.account_number ||
      !formData.ifsc_swift_code ||
      !formData.registered_address ||
      !formData.official_email ||
      !formData.phone_number ||
      !formData.signatory_name ||
      !formData.signatory_designation ||
      !formData.signatory_email ||
      !formData.signatory_phone ||
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
      const res = await dispatch(createVenderKYC(submitData)).unwrap();
      if (res.status === 200 || res.status === 201) {
        showTemporaryMessage("Vendor KYC created successfully!", "success");
      } else if (res.status === 202) {
        showTemporaryMessage("Vendor KYC create accepted!", "success");
      } else {
        showTemporaryMessage("Unexpected response from server.", "error");
        return;
      }
      setFormData({
        vendor: "",
        payment_terms: "",
        credit_days: "",
        credit_limit: "",
        legal_name: "",
        trade_name: "",
        vendor_type: "",
        registration_number: "",
        incorporation_date: "",
        country_of_registration: "",
        tax_id: "",
        vat_number: "",
        tax_certificate: null,
        is_msme: "",
        msme_certificate: null,
        bank_name: "",
        account_holder_name: "",
        account_number: "",
        ifsc_swift_code: "",
        bank_branch: "",
        bank_proof: null,
        registered_address: "",
        operational_address: "",
        official_email: "",
        phone_number: "",
        signatory_name: "",
        signatory_designation: "",
        signatory_email: "",
        signatory_phone: "",
        nda_signed: "",
        contract_signed: "",
        is_blacklisted: "",
        risk_rating: "",
        kyc_status: "",
        approved_at: "",
        approved_by: "",
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
        showTemporaryMessage("Failed to create vendor kyc!", "error");
      }
    }

    setTimeout(() => setActionType(""), 3000);
  };

  return (
    <div className="flex h-screen">
      <div className="hidden lg:block fixed top-0 left-0 h-full w-[350px] z-40">
        <AdminSidebar />
      </div>

      <main className="flex-1 ml-0 lg:ml-[350px] mt-[80px] p-6 overflow-y-auto bg-white backdrop-blur-sm rounded-tl-2xl shadow-inner [&::-webkit-scrollbar]:hidden scrollbar-none">
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
                          Create Vendor KYC
                        </h2>
                      </div>

                      <button
                        onClick={handleSubmit}
                        className="px-3 py-1.5 cursor-pointer bg-amber-400 rounded h-8 text-black flex items-center gap-1 justify-center transition"
                      >
                        <FiSave /> Save
                      </button>
                    </div>

                    <div className="max-h-[290px] rounded overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-none">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 px-6 my-4">
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Vendor <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="vendor"
                            value={formData.vendor}
                            onChange={handleChange}
                            className="flex-1 w-full form-input"
                          >
                            <option value="">Select</option>
                            {vendors.map((vs) => (
                              <option key={vs.id} value={vs.id}>
                                {vs.vendor_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Payment Terms{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="payment_terms"
                            placeholder="Enter Payment Terms"
                            value={formData.payment_terms}
                            onChange={handleChange}
                            className="flex-1 w-full form-input"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Credit Days
                          </label>
                          <input
                            type="number"
                            name="credit_days"
                            placeholder="Enter Credit Days"
                            value={formData.credit_days}
                            onKeyDown={(e) => {
                              if (["-", "+", "e", "E", "."].includes(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            onChange={(e) => {
                              let value = e.target.value;
                              const regex = /^\d*$/;
                              if (value === "" || regex.test(value)) {
                                handleChange(e);
                              }
                            }}
                            min="0"
                            inputMode="numeric"
                            className="flex-1 w-full form-input"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Credit Limit
                          </label>
                          <input
                            type="number"
                            name="credit_limit"
                            placeholder="Enter Credit Limit"
                            value={formData.credit_limit}
                            onKeyDown={(e) => {
                              if (["-", "+", "e", "E"].includes(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            onChange={(e) => {
                              const value = e.target.value;
                              const regex = /^\d*(\.\d{0,3})?$/;
                              if (value === "" || regex.test(value)) {
                                handleChange(e);
                              }
                            }}
                            min="0"
                            step="0.001"
                            inputMode="decimal"
                            className="flex-1 w-full form-input"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Legal Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="legal_name"
                            placeholder="Enter Legal Name"
                            value={formData.legal_name}
                            onChange={handleChange}
                            className="flex-1 w-full form-input"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="w-[200px] text-sm font-medium text-gray-700">
                            Trade Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="trade_name"
                            placeholder="Enter Trade Name"
                            value={formData.trade_name}
                            onChange={handleChange}
                            className="flex-1 w-full form-input"
                          />
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

export default CreateVendorKYC;
