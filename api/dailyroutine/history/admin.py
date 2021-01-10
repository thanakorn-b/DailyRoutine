from django.contrib import admin

from .models import History

class HistoryAdmin(admin.ModelAdmin):
    pass


admin.site.register(History, HistoryAdmin)