ansible-vault decrypt ./env/vault/local.env.encrypt \
  --vault-password-file ~/.personal_finance/vault_pass \
  --output ./env/local.env