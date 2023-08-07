import {Bookmark, Calendar, Code, ElementPlus, Global, GlobalSearch, SearchFavorite} from 'iconsax-react';

import IntlMessages from "../../layout/components/lang/IntlMessages";

const inUse = [
    {
        header: <IntlMessages id="sidebar-in-use" />,
    },
    {
        id: "calendar",
        title: <IntlMessages id="sidebar-pages-calendar-page" />,
        icon: <Calendar size={18} />,
        navLink: "/calendar",
    },
    {
        id: "company-page",
        title: <IntlMessages id="sidebar-pages-company-page" />,
        icon: <Bookmark size={18} />,
        navLink: "/company",
    },
    // {
    //     id: "link-details-page",
    //     title: <IntlMessages id="sidebar-pages-link-details-page" />,
    //     icon: <Code size={18} />,
    //     navLink: "/link-details",
    // },
    {
        id: "search-jobs",
        title: <IntlMessages id="sidebar-pages-search-jobs" />,
        icon: <GlobalSearch size={18} />,
        navLink: "/search-jobs",
    },
    {
        id: "search-engine",
        title: <IntlMessages id="sidebar-pages-search-engine-page" />,
        icon: <SearchFavorite size={18} />,
        navLink: "/search-engines",
    },
    {
        id: "country",
        title: <IntlMessages id="sidebar-pages-country" />,
        icon: <Global size={18} />,
        children: [
            {
                id: "countries",
                title: <IntlMessages id="sidebar-pages-countries" />,
                navLink: "/country",
            },
            {
                id: "country-group",
                title: <IntlMessages id="sidebar-pages-country-group" />,
                navLink: "/country-group",
            },
        ],
    }
];

export default inUse