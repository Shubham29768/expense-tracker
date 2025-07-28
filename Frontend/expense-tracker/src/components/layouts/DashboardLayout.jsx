import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({children, activeMenu}) => {
  const { user } = useContext(UserContext);
  console.log('DashboardLayout - User context value:', user); // DEBUGGING LINE
  console.log('DashboardLayout - Is user truthy?', !!user); // DEBUGGING LINE

  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          {/* TEMPORARILY REMOVED: className="max-[1000px]:hidden" for debugging */}
          <div>
            <SideMenu activeMenu={activeMenu} />
          </div>

          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;