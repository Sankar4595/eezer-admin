import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isApps, setIsApps] = useState(false);
  const [isSales, setIsSales] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [isBlog, setIsBlog] = useState(false);
  const [isMarketing, setIsMarketing] = useState(false);
  const [isSupport, setIsSupport] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Ecommerce") {
      setIsApps(false);
    }
    if (iscurrentState !== "Sales") {
      setIsSales(false);
    }
    if (iscurrentState !== "Customers") {
      setIsCustomer(false);
    }
    if (iscurrentState !== "Blogs") {
      setIsBlog(false);
    }
    if (iscurrentState !== "Marketing") {
      setIsMarketing(false);
    }
    if (iscurrentState !== "Support") {
      setIsSupport(false);
    }
    if (iscurrentState !== "Staffs") {
      setIsStaff(false);
    }
  }, [
    iscurrentState,
    isDashboard,
    isApps,
    isSales,
    isCustomer,
    isBlog,
    isMarketing,
    isSupport,
    isStaff,
  ]);

  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "Dashboard",
      label: "Dashboard",
      link: "/dashboard",
      icon: "ri-dashboard-2-line",
    },
    {
      id: "appsecommerce",
      label: "Products",
      icon: "ri-apps-2-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsApps(!isApps);
        setIscurrentState("Ecommerce");
        updateIconSidebar(e);
      },
      stateVariables: isApps,
      subItems: [
        {
          id: 1,
          label: " Add New Product",
          link: "/apps-ecommerce-add-product",
          parentId: "appsecommerce",
        },
        {
          id: 2,
          label: " All Products",
          link: "/apps-ecommerce-products",
          parentId: "appsecommerce",
        },
        // {
        //   id: 3,
        //   label: "Product Reviews",
        //   link: "/",
        //   parentId: "appsecommerce",
        // },
        {
          id: 4,
          label: "Category",
          link: "/category",
          parentId: "appsecommerce",
        },
        {
          id: 5,
          label: "SubCategory",
          link: "/subcategory",
          parentId: "appsecommerce",
        },
        {
          id: 6,
          label: "Brand",
          link: "/brand",
          parentId: "appsecommerce",
        },
        {
          id: 7,
          label: "Color",
          link: "/color",
          parentId: "appsecommerce",
        },
        {
          id: 8,
          label: "Attribute",
          link: "/attribute",
          parentId: "appsecommerce",
        },
      ],
    },
    {
      id: "Sales",
      label: "Sales",
      icon: "ri-shopping-basket-line",

      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsSales(!isSales);
        setIscurrentState("Sales");
        updateIconSidebar(e);
      },
      stateVariables: isSales,
      subItems: [
        {
          id: 1,
          label: "All Sales",
          link: "/apps-ecommerce-orders",
          parentId: "Sales",
        },
      ],
    },
    {
      id: "Customers",
      label: "Customers",
      link: "/apps-ecommerce-customers",
      icon: "ri-user-line",
    },
    {
      id: "Blogs",
      label: "Blogs",
      icon: "ri-newspaper-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsBlog(!isBlog);
        setIscurrentState("Blogs");
        updateIconSidebar(e);
      },
      stateVariables: isBlog,
      subItems: [
        {
          id: 1,
          label: "All Blogs",
          link: "/",
          parentId: "Blogs",
        },
        {
          id: 2,
          label: "Add New Blog",
          link: "/",
          parentId: "Blogs",
        },
      ],
    },
    {
      id: "Marketing",
      label: "Marketing",
      icon: "ri-bar-chart-2-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsMarketing(!isMarketing);
        setIscurrentState("Marketing");
        updateIconSidebar(e);
      },
      stateVariables: isMarketing,
      subItems: [
        {
          id: 1,
          label: "Subscribers List",
          link: "/",
          parentId: "Marketing",
        },
        {
          id: 2,
          label: "All Coupons",
          link: "/",
          parentId: "Marketing",
        },
      ],
    },
    {
      id: "Support",
      label: "Support",
      icon: "ri-lifebuoy-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsSupport(!isSupport);
        setIscurrentState("Support");
        updateIconSidebar(e);
      },
      stateVariables: isSupport,
      subItems: [
        {
          id: 1,
          label: "Tickets",
          link: "/",
          parentId: "Support",
        },
      ],
    },
    {
      id: "Staffs",
      label: "Staffs",
      icon: "ri-group-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsStaff(!isStaff);
        setIscurrentState("Staffs");
        updateIconSidebar(e);
      },
      stateVariables: isStaff,
      subItems: [
        {
          id: 1,
          label: "All Staffs",
          link: "/",
          parentId: "Staffs",
        },
        {
          id: 2,
          label: "Staffs Permissions",
          link: "/",
          parentId: "Staffs",
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
