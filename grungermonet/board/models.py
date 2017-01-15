from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from django.core.urlresolvers import reverse

# Create your models here.
@python_2_unicode_compatible
class Board(models.Model):
	id = models.AutoField(primary_key=True)
	title = models.CharField(max_length=20)
	writer = models.CharField(max_length=20, default="익명")
	date = models.DateTimeField(auto_now_add=True, blank=True)
	desc = models.CharField(max_length=20)
	content = models.TextField()
	modify_date = models.DateTimeField(auto_now=True, blank=True)


	class Meta:
		db_table = "board"
		ordering = ('-id',)

	def __str__(self):
		return (self.title)

	def get_absolute_url(self):
		return reverse('board:board_detail', args=(self.id,))

	def get_previous_post(self):
		return self.get_previous_by_id()
	def get_next_post(self):
		return self.get_next_by_id()