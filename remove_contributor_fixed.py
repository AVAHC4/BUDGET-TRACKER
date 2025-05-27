#!/usr/bin/env python3

# This script uses git-filter-repo to completely remove a contributor
# and replace with a new identity

import subprocess
import os
import sys

# Change to the repository directory
os.chdir('/Users/akhil/Desktop/MERN_APP/ExpenseTracker')

# Create a backup branch just in case
subprocess.run(['git', 'branch', 'backup-filter-repo-' + subprocess.check_output(['date', '+%Y%m%d']).decode('utf-8').strip()])

# Define the contributor mapping for both emails and names
mailmap = """
AVAHC4 <your-email@example.com> maciekt07 <maciekt07@gmail.com>
AVAHC4 <your-email@example.com> Maciej Twarog <maciekt07@gmail.com>
AVAHC4 <your-email@example.com> maciekkoks <85953204+maciekkoks@users.noreply.github.com>
AVAHC4 <your-email@example.com> maciekkoks <maciekkoks@gmail.com>
"""

# Write the mailmap file
with open('/Users/akhil/Desktop/MERN_APP/ExpenseTracker/.mailmap', 'w') as f:
    f.write(mailmap)

# Now run git-filter-repo to replace all commits
# This is a more powerful and reliable tool than git filter-branch
command = [
    'git-filter-repo',
    '--force',
    '--mailmap', '.mailmap',
    '--replace-refs', 'update-or-add'
]

result = subprocess.run(command, capture_output=True, text=True)
print(result.stdout)
print(result.stderr)

# Remove the temporary mailmap file
os.remove('/Users/akhil/Desktop/MERN_APP/ExpenseTracker/.mailmap')

print("\nHistory has been completely rewritten.")
print("To push this to GitHub and update contributors, run:")
print("git push origin main --force")
