#!/bin/bash
RESTORE='\033[0m'
RED='\033[00;31m'
GREEN='\033[00;32m'
LIGHT_GREEN='\e[92m'
YELLOW='\e[0;33m'

# Inspired from https://github.com/tonylampada/djangular3

# Instructions:
# 1) ". dev.sh"
# 2) "devhelp"
# 3) Seja feliz

export PROJ_BASE=$(pwd)
CD=$(pwd)
cd $PROJ_BASE
cd $CD

function devhelp {
    echo -e "${GREEN}devhelp${RESTORE}           Print this ${RED}help${RESTORE}"
    echo -e ""
    echo -e "${GREEN}deploy${RESTORE}            Deploy this application to dev environment."
    echo -e ""
    echo -e "${GREEN}produce_alias${RESTORE}     Print instructions to create a permanent shortcut to this development environment."
}

function deploy {
  cd $PROJ_BASE
  pipenv clean
  pipenv sync

}

function produce_alias {
    echo_color $YELLOW "------------------------------------------------------------------------"
    echo "${GREEN}This command creates an alias which you can use to go to the development environment."
    echo "Suggestion: ${CYAN}add this to your ~/.zshrc, ~/bash_profile, ~/.bashrc or equivalent${RESTORE}"
    echo_color $YELLOW "------------------------------------------------------------------------"
    echo "${LIGHT_GREEN}f_pf() {"
    echo "   cd `pwd`"
    echo "   source dev.sh"
    echo "   source \`pipenv --venv\`/bin/activate"
    echo "   devhelp"
    echo "}"
    echo "alias pf=f_pf"
    echo_color $YELLOW "------------------------------------------------------------------------"
}

function echo_color {
    echo -e "$1$2${RESTORE}";
}
