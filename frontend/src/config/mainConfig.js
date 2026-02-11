const mainConfig = [
  {
    id: "home",
    label: "Home",
    path: "/admin/home",
    iconName: "FiHome",
    code: "001",
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
        code: "002",
      },
      {
        id: "materialCategoryMenu",
        label: "Material Categories",
        path: "/admin/material-categories",
        iconName: "FiTool",
        code: "003",
      },
      {
        id: "materialTypeMenu",
        label: "Material Types",
        path: "/admin/material-types",
        iconName: "FiTool",
        code: "004",
      },
    ],
  },
];

export default mainConfig;
