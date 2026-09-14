from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, JobApplicationSerializer
from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import AllowAny
from .models import JobApplication, User
from django.contrib.auth import authenticate, login, get_user_model
from uuid import UUID
from rest_framework.authentication import SessionAuthentication
from rest_framework.parsers import JSONParser





class UserRegistrationView(APIView):
    # authentication_classes = []  # Disable SessionAuthentication
    # permission_classes = [AllowAny]  # Allow any user to access this view
    authentication_classes = [SessionAuthentication]
    permission_classes = [AllowAny] 

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'message': 'User registered successfully',
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    authentication_classes = [SessionAuthentication]  
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({
                'error': 'Please provide both email and password' 
            }, status=status.HTTP_400_BAD_REQUEST)
            
        user = authenticate(email=email, password=password)
        
        if user is None:
            return Response({
                'error': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)
            
        if not user.is_active:
            return Response({
                'error': 'User account is disabled'
            }, status=status.HTTP_401_UNAUTHORIZED)
            
        # Create session for the user
        login(request, user)
        
        return Response({
            'message': 'Login successful',
            'user': {
                'username': user.username
            }
        }, status=status.HTTP_200_OK)

class LogoutView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({
            'message': 'Successfully logged out'
        }, status=status.HTTP_200_OK)


class CreateJobApplicationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Retrieve the user.id from session and convert it back to UUID
        user_id = request.session.get('user_id')
        print(user_id)

        # Check if the user id exists in the session
        if not user_id:
            return Response({'error': 'User ID not found in session'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=user_id)  

            print("Authenticated User:", user)

            if not user:
                return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)


            job_id =  request.data.get('job_id'); 

            if job_id:
                try:
                    # Retrieve application for the user
                    application = JobApplication.objects.get(job_id=job_id, user=user)
                    serializer = JobApplicationSerializer(application, data=request.data, partial=True)
                    if serializer.is_valid():
                        serializer.save()
                        return Response({
                            'message': 'Job application updated successfully',
                        }, status=status.HTTP_200_OK)
                    return Response({
                        'error': 'Invalid data',
                        'details': serializer.errors
                    }, status=status.HTTP_400_BAD_REQUEST) 
                except JobApplication.DoesNotExist:
                    return Response({
                        'error': 'Job application not found'
                    }, status=status.HTTP_404_NOT_FOUND)

            # If no application_id, create a new job application
            serializer = JobApplicationSerializer(data=request.data)
            if serializer.is_valid():
                application = serializer.save(user=user)

                # Optionally, store the application_id in the session if needed later
                request.session['application_id'] = application.id

                return Response({
                    'message': 'Job application created successfully',
                }, status=status.HTTP_201_CREATED)

            return Response({
                'error': 'Invalid data',
                'details': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response({
                'error': 'Invalid user ID format in session'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        

class DeleteJobApplicationView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        try:
            # Parse incoming job_id
            data = JSONParser().parse(request)
            job_id = data.get('job_id')

            if not job_id:
                return Response({
                    'error': 'Job ID is required'
                }, status=status.HTTP_400_BAD_REQUEST)

            user = request.user

            try:
                application = JobApplication.objects.get(job_id=job_id, user=user)
                application.delete()
                return Response({
                    'message': 'Job application deleted successfully'
                }, status=status.HTTP_200_OK)

            except JobApplication.DoesNotExist:
                return Response({
                    'error': 'Job application not found'
                }, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({
                'error': 'Failed to delete job application',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetUserApplicationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user  # Comes from session/cookie-based login
        print("User ID from session:", user.id)
        # Save user.id to session as a string (UUID -> string)
        request.session['user_id'] = str(user.id)  # Convert UUID to string

        try:
            applications = JobApplication.objects.filter(user_id=user.id)
            serializer = JobApplicationSerializer(applications, many=True)
            return Response({
                'message': 'Applications retrieved successfully',
                'applications': serializer.data
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': 'Failed to retrieve applications',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

