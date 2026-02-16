const mainConfig = [
  {
    id: "home",
    label: "Home",
    path: "/admin/home",
    iconName: "FiHome",
  },
  {
    id: "enterpriseStructureMenu",
    label: "Enterprise Structure",
    iconName: "FaBuilding",
    subMenu: [
      {
        id: "usersMenu",
        label: "Users",
        iconName: "FiUsers",
        subMenu: [
          {
            id: "createUserMenu",
            label: "Create User",
            path: "/admin/users/create",
            iconName: "FiUsers",
          },
          {
            id: "viewUsersMenu",
            label: "View Users",
            path: "/admin/users/view",
            iconName: "FiUsers",
          },
        ],
      },
      {
        id: "companyMenu",
        label: "Company",
        iconName: "FaBuilding",
        subMenu: [
          {
            id: "createCompanyMenu",
            label: "Create Company",
            path: "/admin/company/create",
            iconName: "FaBuilding",
          },
          {
            id: "viewCompaniesMenu",
            label: "View Companies",
            path: "/admin/company/view",
            iconName: "FaBuilding",
          },
        ],
      },
    ],
  },
  {
    id: "procureToPayMenu",
    label: "Procure To Pay (PTP)",
    iconName: "FaMoneyBill",
    subMenu: [
      {
        id: "vendorManagementMenu",
        label: "Vendor Management",
        iconName: "FiUsers",
        subMenu: [
          {
            id: "vendorTypesMenu",
            label: "Vendor Types",
            iconName: "FiUsers",
            subMenu: [
              {
                id: "createVendorTypeMenu",
                label: "Create Vendor Type",
                path: "/admin/vendor-types/create",
                iconName: "FiUsers",
              },
              {
                id: "viewVendorTypesMenu",
                label: "View Vendor Types",
                path: "/admin/vendor-types/view",
                iconName: "FiUsers",
              },
            ],
          },
          {
            id: "vendorOnboardingMenu",
            label: "Vendor Onboarding",
            path: "/admin/vendor-onboarding",
            iconName: "FiUsers",
          },
          {
            id: "vendorMasterMenu",
            label: "Vendor Master",
            path: "/admin/vendor-master",
            iconName: "FiUsers",
          },
          {
            id: "vendorAgreementsMenu",
            label: "Vendor Agreements",
            path: "/admin/vendor-agreements",
            iconName: "FiUsers",
          },
        ],
      },
      {
        id: "quotationsMenu",
        label: "Quotations",
        path: "/admin/quotations",
        iconName: "FaFileSignature",
      },
      {
        id: "purchaseOrderGoodsReceiptMenu",
        label: "Purchase Order Goods Receipt",
        path: "/admin/purchase-order-goods-receipt",
        iconName: "FaFileSignature",
      },
      {
        id: "invoiceVerificationMenu",
        label: "Invoice Verification",
        path: "/admin/invoice-verification",
        iconName: "FaFileSignature",
      },
      {
        id: "paymentsMenu",
        label: "Payments",
        path: "/admin/payments",
        iconName: "FaMoneyBill",
      },
    ],
  },
  {
    id: "materialManagementMenu",
    label: "Material Management",
    iconName: "FiTool",
    subMenu: [
      {
        id: "materialGroupMenu",
        label: "Material Groups",
        path: "/admin/material-groups",
        iconName: "FiTool",
      },
      {
        id: "materialCategoryMenu",
        label: "Material Categories",
        path: "/admin/material-categories",
        iconName: "FiTool",
      },
      {
        id: "materialTypeMenu",
        label: "Material Types",
        path: "/admin/material-types",
        iconName: "FiTool",
      },
      {
        id: "materialMasterMenu",
        label: "Material Master",
        path: "/admin/materials",
        iconName: "FiTool",
      },
    ],
  },
];

export default mainConfig;
