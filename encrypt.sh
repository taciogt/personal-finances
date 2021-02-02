ansible-vault encrypt ./env/local.env \
 --vault-password-file ~/.personal_finance/vault_pass \
 --output ./env/vault/local.env.encrypt


ansible-vault ./env/local.env \
  --vault-password-file ~/.personal_finance/vault_pass \
  --output ./env/vault/local.env.encrypt

ansible-vault encrypt ./env/local.env --vault-password-file ~/.personal_finance/vault_pass --output ./env/vault/local.env.encrypt

ansible-vault decrypt ./env/vault/local.env.encrypt --vault-password-file ~/.personal_finance/vault_pass --output ./env/local.env
