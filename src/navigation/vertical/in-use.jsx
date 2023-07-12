import {Global, SearchFavorite} from 'iconsax-react';

import IntlMessages from "../../layout/components/lang/IntlMessages";

const inUse = [
    {
        header: <IntlMessages id="sidebar-in-use" />,
    },
    {
        id: "search-engine",
        title: <IntlMessages id="sidebar-pages-search-engine-page" />,
        icon: <SearchFavorite size={18} />,
        navLink: "/pages/search-engines",
    },
    {
        id: "country",
        title: <IntlMessages id="sidebar-pages-country" />,
        icon: <Global size={18} />,
        children: [
            {
                id: "countries",
                title: <IntlMessages id="sidebar-pages-countries" />,
                navLink: "/pages/country",
            },
            {
                id: "country-group",
                title: <IntlMessages id="sidebar-pages-country-group" />,
                navLink: "/pages/country-group",
            },
        ],
    }
];

export default inUse