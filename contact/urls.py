from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('contacts', views.contacts, name="contacts"),
    path('contact_form', views.contact_form, name="contact_form"),
    path('contact_form/<int:Pid>', views.contact_form, name="contact_form"),
    path('contact_info/<int:Pid>', views.contact_info, name="contact_info"),
    path('crm_login', views.crm_login, name="crm_login"),
]
