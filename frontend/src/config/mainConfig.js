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
            id: "viewUserMenu",
            label: "View Users",
            path: "/admin/users/view",
            iconName: "FiUsers",
          },
        ],
      },
      {
        id: "companyMenu",
        label: "Company",
        path: "/admin/company",
        iconName: "FaBuilding",
      },
      {
        id: "assignUserstoCompanyMenu",
        label: "Assign Users to Company",
        path: "/admin/assign-users-to-company",
        iconName: "FiUsers",
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
        label: "Vender Management",
        iconName: "FiUsers",
        subMenu: [
          {
            id: "vendorOnboardingMenu",
            label: "Vender Onboarding",
            path: "/admin/vender-onboarding",
            iconName: "FiUsers",
            subMenu: [
              {
                id: "vendorTypesMenu",
                label: "Vender Types",
                path: "/admin/vender-types",
                iconName: "FiUsers",
              },
            ],
          },
          {
            id: "vendorMasterMenu",
            label: "Vender Master",
            path: "/admin/vender-master",
            iconName: "FiUsers",
          },
          {
            id: "vendorAgreementsMenu",
            label: "Vender Agreements",
            path: "/admin/vender-agreements",
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
        id: "purchaseOrderGoodsRecieptMenu",
        label: "Purchase Order Goods Reciept",
        path: "/admin/purchase-order-goods-reciept",
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
