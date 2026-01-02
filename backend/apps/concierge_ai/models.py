from django.db import models
from apps.properties.models import Property
from apps.accounts.models import User


class AIConversation(models.Model):
    """AI Conversation model for tracking AI interactions."""
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='ai_conversations')
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='ai_conversations')
    session_id = models.CharField(max_length=100)
    channel = models.CharField(max_length=50, default='web')  # web, whatsapp, telegram
    started_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    metadata = models.JSONField(default=dict, blank=True)
    
    class Meta:
        verbose_name = 'Conversa IA'
        verbose_name_plural = 'Conversas IA'
    
    def __str__(self):
        return f"Conversa {self.session_id}"


class AIMessage(models.Model):
    """AI Message model."""
    ROLE_CHOICES = [
        ('user', 'Usuário'),
        ('assistant', 'Assistente'),
        ('system', 'Sistema'),
    ]
    
    conversation = models.ForeignKey(AIConversation, on_delete=models.CASCADE, related_name='messages')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    metadata = models.JSONField(default=dict, blank=True)
    
    class Meta:
        verbose_name = 'Mensagem IA'
        verbose_name_plural = 'Mensagens IA'
        ordering = ['created_at']
    
    def __str__(self):
        return f"{self.role}: {self.content[:50]}..."


class AIKnowledgeBase(models.Model):
    """Knowledge base for AI assistant."""
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='knowledge_base')
    title = models.CharField(max_length=255)
    content = models.TextField()
    category = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Base de Conhecimento'
        verbose_name_plural = 'Bases de Conhecimento'
    
    def __str__(self):
        return self.title
