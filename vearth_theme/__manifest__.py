{
    "name": "Vearth Nutraceuticles Website",
    "version": "1.0",
    "category": "Website",
    "summary": "Official Website for Vearth Nutraceuticles",
    "depends": ["web","website"],
    "data": [
        "views/about_vearth_view.xml",
        "views/home_page_view.xml",
        "views/manufacturing_page_view.xml",
        "views/service_and_catrgory_view.xml",
        "views/product_page_view.xml",
        "views/footer_view.xml",
        "views/header_view.xml",
    ],
    "assets": {
        "web.assets_frontend": [
            "/vearth_theme/static/src/css/about_page.scss",
            "/vearth_theme/static/src/css/common.scss",
            "/vearth_theme/static/src/css/home_page.scss",
            "/vearth_theme/static/src/css/manufacturing.scss",
            "/vearth_theme/static/src/css/product_style.scss",
            "/vearth_theme/static/src/css/category.css",
            "/vearth_theme/static/src/js/about_page.js",
            "/vearth_theme/static/src/js/manufacturing.js",
            "/vearth_theme/static/src/js/categoty.js",
            "/vearth_theme/static/src/js/product_navigation.js"
        ],
    },
    "installable": True,
    "application": True,
}

