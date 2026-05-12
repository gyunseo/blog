---
title: Powershell Text 변환
pubDatetime: 2023-10-30T21:50:00+09:00
featured: false
draft: false
tags:
  - Powershell
description: 음...
---

## Table of contents

## 들어가며

## `powershell` Commands

```powershell
$folderPath = "C:\Users\rbstj\gyunseo.github.io\src\content\blog"



# Define the text to find and replace

$findText = "/src/assets/image/"

$replaceText = "https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/"



# Get a list of all Markdown files in the folder

$markdownFiles = Get-ChildItem -Path $folderPath -Filter "*.md"



# Iterate through each Markdown file and perform the text replacement

foreach ($file in $markdownFiles) {

    # Read the content of the file

    $fileContent = Get-Content -Path $file.FullName -Raw



    # Perform the text replacement

    $newContent = $fileContent -replace $findText, $replaceText



    # Write the updated content back to the file

    Set-Content -Path $file.FullName -Value $newContent

}



Write-Host "Text replacement completed for all Markdown files in $folderPath."
```
