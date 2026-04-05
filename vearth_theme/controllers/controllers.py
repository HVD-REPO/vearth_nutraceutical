from odoo import http
from odoo.http import request


class VearthTheme(http.Controller):
    @http.route('/about-vearth', type='http', auth='public', website=True)
    def about_us_page(self, **kwargs):
        """
        This controller handles the request for the /hello-odoo page.
        It renders a QWeb template and passes a dynamic value.
        """
        user_name = request.env.user.name if request.env.user.id else 'Guest'
        return request.render('vearth_theme.vearth_about_us_page')

    @http.route('/', type='http', auth='public', website=True)
    def Home(self, **kwargs):
        """
        This controller handles the request for the /hello-odoo page.
        It renders a QWeb template and passes a dynamic value.
        """
        user_name = request.env.user.name if request.env.user.id else 'Guest'
        return request.render('vearth_theme.vearth_landing_page')

    @http.route('/manufacturing', type='http', auth='public', website=True)
    def ManufacturingCapablity(self, **kwargs):
        """
        This controller handles the request for the /hello-odoo page.
        It renders a QWeb template and passes a dynamic value.
        """
        user_name = request.env.user.name if request.env.user.id else 'Guest'
        return request.render('vearth_theme.vearth_manufacturing_page')

    @http.route('/service', type='http', auth='public', website=True)
    def ServiceCategory(self, **kwargs):
        """
        This controller handles the request for the /hello-odoo page.
        It renders a QWeb template and passes a dynamic value.
        """
        user_name = request.env.user.name if request.env.user.id else 'Guest'
        return request.render('vearth_theme.vearth_service_and_category_page')

    @http.route('/products', type='http', auth='public', website=True)
    def VearthProduct(self, **kwargs):
        """
        This controller handles the request for the /hello-odoo page.
        It renders a QWeb template and passes a dynamic value.
        """
        user_name = request.env.user.name if request.env.user.id else 'Guest'
        return request.render('vearth_theme.vearth_product_page')


