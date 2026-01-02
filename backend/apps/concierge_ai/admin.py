from django.contrib import admin
from .models import AIConversation, AIMessage, AIKnowledgeBase


@admin.register(AIConversation)
class AIConversationAdmin(admin.ModelAdmin):
    list_display = ['session_id', 'property', 'channel', 'is_active', 'started_at']
    list_filter = ['is_active', 'channel', 'property']


@admin.register(AIMessage)
class AIMessageAdmin(admin.ModelAdmin):
    list_display = ['conversation', 'role', 'created_at']
    list_filter = ['role']


@admin.register(AIKnowledgeBase)
class AIKnowledgeBaseAdmin(admin.ModelAdmin):
    list_display = ['title', 'property', 'category', 'is_active']
    list_filter = ['is_active', 'category', 'property']
    search_fields = ['title', 'content']
