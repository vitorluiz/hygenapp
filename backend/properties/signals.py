from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Property, PropertyAccess


@receiver(post_save, sender=Property)
def create_owner_access(sender, instance, created, **kwargs):
    """
    Cria automaticamente um registro PropertyAccess com role=OWNER
    quando uma nova propriedade é criada.
    """
    if created:
        PropertyAccess.objects.create(
            user=instance.owner,
            property=instance,
            role=PropertyAccess.Role.OWNER
        )
