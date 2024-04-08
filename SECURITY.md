# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are
currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 5.1.x   | :white_check_mark: |
| 5.0.x   | :x:                |
| 4.0.x   | :white_check_mark: |
| < 4.0   | :x:                |

## Reporting a Vulnerability

Use this section to tell people how to report a vulnerability.

Tell them where to go, how often they can expect to get an update on a
reported vulnerability, what to expect if the vulnerability is accepted or
declined, etc.
# Modifier les règles de politique pour permettre à tous les utilisateurs de push, commit, créer des branches, fusionner et supprimer
repo.edit(default_branch_protection=True,
          allow_squash_merge=True,
          allow_merge_commit=True,
          allow_rebase_merge=True,
          delete_branch_on_merge=True)

print("Les règles de politique ont été modifiées avec succès.")
