from django.contrib import admin
from members.models import Member
# Register your models here.

class MemberAdmin(admin.ModelAdmin):
	list_display = ('name', 'role', 'photo')

admin.site.register(Member, MemberAdmin)