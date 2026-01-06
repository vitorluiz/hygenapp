# [TASK-13.4] Melhorar a Precisão da Busca (Case-Insensitive e Diacritic-Insensitive)

**Épico:** 13 - Portal de Descoberta Hyfen
**Tipo:** Tarefa Técnica (Melhoria)
**Associada a:** [US-13.2]

**Problema:**
> A funcionalidade de busca atual é sensível a maiúsculas/minúsculas e a acentos (diacríticos). Uma busca por "veu" não retorna resultados para "Véu", e uma busca por "pousada" não retorna "Pousada". Isso resulta em uma experiência de usuário pobre e pode levar o usuário a acreditar que uma propriedade não existe quando ela está cadastrada.

**Objetivo:**
> Refatorar a lógica de busca no backend para que ela seja "inteligente", ignorando diferenças de capitalização e acentuação, garantindo que os resultados sejam relevantes e abrangentes.

### Critérios de Aceite:

1.  ✅ A busca deve ser **Case-Insensitive**: Uma busca por `pousada sol nascente` deve retornar o mesmo resultado que `Pousada Sol Nascente`.
2.  ✅ A busca deve ser **Diacritic-Insensitive**: Uma busca por `veu da noiva` deve retornar o mesmo resultado que `Véu da Noiva`. Uma busca por `paraty` deve encontrar `Paraty`.
3.  ✅ A implementação deve ser feita no **backend** (Django), na lógica de filtragem do `ViewSet` que atende ao endpoint `GET /api/v0/public/properties/`.
4.  ✅ A solução deve ser eficiente e não degradar significativamente a performance da busca no banco de dados.

### Diretriz Técnica para Implementação (Recomendação do Arquiteto):

A forma mais robusta e eficiente de implementar isso no Django com PostgreSQL é utilizando as funções nativas do banco de dados.

1.  **Instalar a extensão `unaccent` no PostgreSQL:**
    *   Crie uma nova migração vazia no Django (`python manage.py makemigrations --empty yourappname`).
    *   Dentro do arquivo de migração, adicione a operação para instalar a extensão:
        ```python
        from django.db import migrations

        class Migration(migrations.Migration):
            dependencies = [
                ('previous_migration_file'),
            ]
            operations = [
                migrations.RunSQL(
                    "CREATE EXTENSION IF NOT EXISTS unaccent;",
                    "DROP EXTENSION IF EXISTS unaccent;",
                )
            ]
        ```
    *   Execute a migração (`python manage.py migrate`).

2.  **Refatorar a Query de Busca:**
    *   Use a anotação `Unaccent` do Django para aplicar a função `unaccent` tanto no campo do banco de dados quanto no termo de busca.
    *   Use a lookup `__icontains` para a busca case-insensitive.
    *   **Exemplo de Código no `ViewSet`:**
        ```python
        from django.contrib.postgres.search import Unaccent
        from django.db.models.functions import Lower

        # ... dentro do método get_queryset ...
        search_term = self.request.query_params.get('search', None)
        if search_term:
            # Remove acentos e converte para minúsculas tanto o campo quanto o termo
            queryset = queryset.annotate(
                name_unaccent=Unaccent(Lower('name')),
                city_unaccent=Unaccent(Lower('city'))
            ).filter(
                Q(name_unaccent__icontains=Unaccent(Lower(search_term))) |
                Q(city_unaccent__icontains=Unaccent(Lower(search_term)))
            )
        return queryset
        ```

