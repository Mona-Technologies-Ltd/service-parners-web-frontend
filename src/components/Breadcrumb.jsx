import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const BreadcrumbComponent = () => {
  const location = useLocation();

  // Parse the path and generate breadcrumb items
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  // Start with an empty breadcrumb array instead of including Dashboard by default
  const breadcrumbItems = [];

  // Build breadcrumb items based on current path
  let url = "";
  pathSnippets.forEach((snippet, index) => {
    url += `/${snippet}`;

    let formattedTitle = snippet;

    // Check if this is a team member profile page
    if (
      pathSnippets[0] === "team-members" &&
      index === 1 &&
      location.state?.memberName
    ) {
      formattedTitle = location.state.memberName;
    }
    // Check if this is a device detail page
    else if (pathSnippets[0] === "devices" && index === 1) {
      formattedTitle = "Device Detail";
    } else {
      formattedTitle = snippet
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    // Add all path segments to breadcrumb
    breadcrumbItems.push({
      title:
        index === pathSnippets.length - 1 ? (
          formattedTitle
        ) : (
          <Link to={url}>{formattedTitle}</Link>
        ),
    });
  });

  return <Breadcrumb items={breadcrumbItems} style={{ margin: "16px 0" }} />;
};

export default BreadcrumbComponent;
