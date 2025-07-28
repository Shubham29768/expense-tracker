import {
  LuLayoutDashboard,
  LuCoins,
  LuWallet, 
  LuLogOut,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Income",
    icon: LuWallet, // ✅ fixed here
    path: "/income",
  },
  {
    id: "06",
    label: "Expense",
    icon: LuLogOut,
    path: "logout",
  },
];
