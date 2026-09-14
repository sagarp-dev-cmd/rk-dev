from django.db import migrations, models

def populate_job_ids(apps, schema_editor):
    JobApplication = apps.get_model('User', 'JobApplication')
    for application in JobApplication.objects.filter(job_id__isnull=True):
        # Clean position string (no spaces, no special chars)
        position_clean = ''.join(e for e in application.position if e.isalnum())
        
        # Get last 4 characters of user's UUID (user.id)
        unique_suffix = str(application.user.id)[-4:]
        
        # Build job_id
        application.job_id = f"{position_clean}-{unique_suffix}"
        application.save()

class Migration(migrations.Migration):

    dependencies = [
        ('User', '0001_initial'),  # Adjust if needed
    ]

    operations = [
        migrations.AddField(
            model_name='jobapplication',
            name='job_id',
            field=models.CharField(max_length=255, unique=True, editable=False, null=True),
        ),
        migrations.RunPython(populate_job_ids),
        migrations.AlterField(
            model_name='jobapplication',
            name='job_id',
            field=models.CharField(max_length=255, unique=True, editable=False),
        ),
    ]
