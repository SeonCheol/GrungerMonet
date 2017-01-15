from django.contrib import admin
from board.models import Board

# Register your models here.

class BoardAdmin(admin.ModelAdmin):
	list_display = ('title', 'date')
	list_filter = ('id',)
	search_fields = ('id', 'title', 'content')
	prepopulated_fields = {'desc' : ('title',)}

admin.site.register(Board, BoardAdmin)