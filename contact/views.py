from django.shortcuts import render

# Create your views here.


def crm_login(request):
    return render(request, 'login.html')


def home(request):
    return render(request, 'home.html')


def contacts(request):
    return render(request, 'contacts.html')


def contact_form(request, Pid=None):
    if Pid:
        # print(Pid)
        return render(request, 'contact_form.html', {'Pid': Pid})
    else:
        return render(request, 'form.html')


def contact_info(request, Pid):
    return render(request, 'contact-info.html', {'Pid': Pid})
