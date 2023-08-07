import { Health } from 'iconsax-react';

import IntlMessages from "../../layout/components/lang/IntlMessages";

const main = [
    {
        header: <IntlMessages id="sidebar-dashboards" />,
    },
    {
        id: "dashboards-analytics",
        title: <IntlMessages id="sidebar-dashboards-analytics" />,
        icon: <Health size={18} />,
        navLink: "/dashboard",
    },
];

export default main