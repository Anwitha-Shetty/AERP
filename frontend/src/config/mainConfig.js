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
                label: "Create Type",
                path: "/admin/vendor-types/create",
                iconName: "FiUsers",
              },
              {
                id: "viewVendorTypesMenu",
                label: "View Types",
                path: "/admin/vendor-types/view",
                iconName: "FiUsers",
              },
            ],
          },
          {
            id: "vendorKYCStatusMenu",
            label: "Vendor KYC Status",
            iconName: "FiUsers",
            subMenu: [
              {
                id: "createVendorKYCStatusMenu",
                label: "Create KYC Status",
                path: "/admin/vendor-kyc-status/create",
                iconName: "FiUsers",
              },
              {
                id: "viewVendorKYCStatusMenu",
                label: "View KYC Status",
                path: "/admin/vendor-kyc-status/view",
                iconName: "FiUsers",
              },
            ],
          },
          {
            id: "vendorMenu",
            label: "Vendors",
            iconName: "FiUsers",
            subMenu: [
              {
                id: "createVendorMenu",
                label: "Create Vendor",
                path: "/admin/vendor/create",
                iconName: "FiUsers",
              },
              {
                id: "viewVendorsMenu",
                label: "View Vendors",
                path: "/admin/vendors/view",
                iconName: "FiUsers",
              },
            ],
          },
          {
            id: "vendorMaterialsMenu",
            label: "Vendor Materials",
            iconName: "FiUsers",
            subMenu: [
              {
                id: "createVendorMaterialMenu",
                label: "Create Vendor Material",
                path: "/admin/vendor-material/create",
                iconName: "FiUsers",
              },
              {
                id: "viewVendorMaterialsMenu",
                label: "View Vendor Materials",
                path: "/admin/vendor-materials/view",
                iconName: "FiUsers",
              },
            ],
          },
          {
            id: "vendorDeclarationsMenu",
            label: "Vendor Declarations",
            iconName: "FiUsers",
            subMenu: [
              {
                id: "createVendorDeclarationMenu",
                label: "Create Vendor Declaration",
                path: "/admin/vendor-declaration/create",
                iconName: "FiUsers",
              },
              {
                id: "viewVendorDeclarationsMenu",
                label: "View Vendor Declarations",
                path: "/admin/vendor-declarations/view",
                iconName: "FiUsers",
              },
            ],
          },
          {
            id: "vendorQuotationsMenu",
            label: "Vendor Quotations",
            iconName: "FiUsers",
            subMenu: [
              {
                id: "createVendorQuotationMenu",
                label: "Create Vendor Quotation",
                path: "/admin/vendor-quotation/create",
                iconName: "FiUsers",
              },
              {
                id: "viewVendorQuotationsMenu",
                label: "View Vendor Quotations",
                path: "/admin/vendor-quotations/view",
                iconName: "FiUsers",
              },
            ],
          },
          {
            id: "vendorKYCMenu",
            label: "Vendor KYC",
            iconName: "FiUsers",
            subMenu: [
              {
                id: "createVendorKYCMenu",
                label: "Create Vendor KYC",
                path: "/admin/vendor-kyc/create",
                iconName: "FiUsers",
              },
              {
                id: "viewVendorKYCsMenu",
                label: "View Vendor KYC",
                path: "/admin/vendor-kyc/view",
                iconName: "FiUsers",
              },
            ],
          },
          {
            id: "vendorMasterMenu",
            label: "Vendor Master",
            path: "/admin/vendor-master",
            iconName: "FiUsers",
          },
        ],
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
