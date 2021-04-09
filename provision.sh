#!/bin/bash
ansible --version
# AWS_ACCESS_KEY_ID=$LC_AWS_ACCESS_KEY_ID
# AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
cd movie-ramp-up/ansible
ansible-playbook add-key.yml -i ec2.py -l tag_Name_Front_EC2_Terra_juan_bolanosr --key-file ~/key-pair-JB.pem --user ubuntu
ansible-playbook ui.yml -i ec2.py -l tag_Name_Front_EC2_Terra_juan_bolanosr --user ubuntu