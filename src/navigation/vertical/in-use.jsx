import {Bookmark, Calendar, Code, ElementPlus, Global, SearchFavorite} from 'iconsax-react';

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
    {
        id: "link-details-page",
        title: <IntlMessages id="sidebar-pages-link-details-page" />,
        icon: <Code size={18} />,
        navLink: "/link-details",
    },
    {
        id: "add-new-term",
        title: <IntlMessages id="sidebar-pages-new-term-page" />,
        icon: <ElementPlus size={18} />,
        navLink: "/add-new-term",
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