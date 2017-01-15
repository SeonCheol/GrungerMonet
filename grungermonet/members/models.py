from django.db import models
from django.utils.encoding import python_2_unicode_compatible

# Create your models here.
@python_2_unicode_compatible
class Member(models.Model):
	name = models.CharField(max_length=20)
	birth = models.DateTimeField()
	role = models.CharField(max_length=30)
	photo = models.CharField(max_length=40)

	def __str__(self):
		return self.name