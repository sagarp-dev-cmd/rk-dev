from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import JobApplication

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password', 'password2')
        extra_kwargs = {
            'email': {'required': True},
            'username': {'required': True},
            'id': {'read_only': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

class JobApplicationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    jobType = serializers.CharField(source='jobtype', allow_blank=True, allow_null=True)
    link = serializers.URLField(source='job_url', allow_blank=True, allow_null=True)

    dateApplied = serializers.DateTimeField(
        input_formats=['%Y-%m-%dT%H:%M:%S.%fZ'],  # Accept datetime string with time and timezone
        format='%Y-%m-%d'  # Output only the date in YYYY-MM-DD format
    )

    class Meta:
        model = JobApplication
        fields = '__all__'  # Includes all model fields
        read_only_fields = ['id', 'user']  # ✅ Make user read-only so it's not required from frontend

