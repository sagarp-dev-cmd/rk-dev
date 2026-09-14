# from django.contrib.auth.models import AbstractUser
# from django.db import models
# import uuid

# class User(AbstractUser):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     email = models.EmailField(unique=True)
#     username = models.CharField(max_length=150, unique=True)
#     password = models.CharField(max_length=128)
#     last_login = models.DateTimeField(blank=True, null=True)
#     is_superuser = models.BooleanField(default=False)
#     is_staff = models.BooleanField(default=False)
#     is_active = models.BooleanField(default=True)
#     date_joined = models.DateTimeField(auto_now_add=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['username']

#     def __str__(self):
#         return self.email

#     def save(self, *args, **kwargs):
#         if not self.id:
#             self.id = uuid.uuid4()
#         super().save(*args, **kwargs)

# class JobApplication(models.Model):
#     STATUS_CHOICES = [
#         ('applied', 'Applied'),
#         ('interviewing', 'Interviewing'),
#         ('offered', 'Offered'),
#         ('rejected', 'Rejected'),
#         ('accepted', 'Accepted'),
#     ]

#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
#     company = models.CharField(max_length=255)
#     position = models.CharField(max_length=255)
#     location = models.CharField(max_length=255)
#     jobtype = models.CharField(max_length=255, blank=True, null=True)
#     salary = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
#     job_url = models.URLField(blank=True, null=True)
#     dateApplied = models.DateField()
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='applied')
#     notes = models.TextField(blank=True, null=True)
#     contactEmail = models.EmailField(blank=True, null=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return f"{self.user.email} - {self.position} at {self.company}"









from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid

class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    # def save(self, *args, **kwargs):
    #     if not self.id:
    #         self.id = uuid.uuid4()
    #     super().save(*args, **kwargs)

class JobApplication(models.Model):
    job_id = models.CharField(max_length=255, unique=True, editable=False)  # <== Added field

    STATUS_CHOICES = [
        ('applied', 'Applied'),
        ('interview', 'interview'),
        ('offer', 'Offer'),
        ('rejected', 'Rejected'),
        ('accepted', 'Accepted'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
    company = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    jobtype = models.CharField(max_length=255, blank=True, null=True)  # jobType
    salary = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    job_url = models.URLField(blank=True, null=True)  # link
    description = models.TextField(blank=True, null=True)  # description
    dateApplied = models.DateTimeField()  # dateApplied
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='applied')
    contactName = models.CharField(max_length=255, blank=True, null=True)  # contactName
    contactEmail = models.EmailField(blank=True, null=True)
    contactPhone = models.CharField(max_length=20, blank=True, null=True)  # contactPhone
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Only set job_id if not already set
        if not self.job_id:
            # Clean position string (no spaces, special chars)
            position_clean = ''.join(e for e in self.position if e.isalnum())
            # Get last 4 chars from user's UUID
            unique_suffix = str(self.user.id)[-4:]
            # Combine to form job_id
            self.job_id = f"{position_clean}-{unique_suffix}"
        
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.email} - {self.position} at {self.company}"

