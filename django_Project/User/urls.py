from django.urls import path
from .views import (
    UserRegistrationView, 
    LoginView, 
    LogoutView,
    CreateJobApplicationView, 
    GetUserApplicationsView,
    DeleteJobApplicationView
)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('login/', LoginView.as_view(), name='user-login'),
     path('logout/', LogoutView.as_view(), name='user-logout'),
    path('addeditjobdetails/', CreateJobApplicationView.as_view(), name='add-edit_job_details'),
    path('getjobdetails/', GetUserApplicationsView.as_view(), name='get-user-applications'),
     path('deletejobdetails/', DeleteJobApplicationView.as_view(), name='delete_job'),
] 