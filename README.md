# AIUB CAPTCHA Solver

A simple Chrome extension to assist users in solving math-based CAPTCHA on the AIUB portal.

---

## Overview

The AIUB portal uses a math CAPTCHA where users must solve simple arithmetic expressions before logging in. This Chrome extension helps users calculate the expression quickly by prompting them to enter the CAPTCHA expression and then automatically filling in the result.

> **Important:** This extension does **not** bypass or hack the CAPTCHA. It is designed to assist humans by performing the calculation safely and securely within browser restrictions.

---

## Features

- Prompts the user to enter the math expression from the CAPTCHA.
- Supports addition, subtraction.
- Calculates the correct result without using unsafe `eval()` functions.
- Automatically fills the solved result into the CAPTCHA input field.
- Works within browser security policies (Content Security Policy compliant).

---

## Installation

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the project folder.
5. Visit [https://portal.aiub.edu/](https://portal.aiub.edu/) to try the extension.

---

## Usage

- Click the CAPTCHA input field on the AIUB portal, or
- Enter the math expression shown in the CAPTCHA (e.g., `12 + 7 * 2`).
- The extension will calculate and auto-fill the answer for you.

---

## How It Works

The extension injects a content script on the AIUB portal page that listens for user interaction. When triggered, it asks the user to input the math expression. Then, it safely parses and calculates the expression using a custom evaluator — avoiding the use of `eval()` to comply with browser security policies — and sets the result in the input field.

---

## Disclaimer

This extension is for educational and personal productivity purposes only. It does **not** automate CAPTCHA bypassing or violate any website policies. Use responsibly.

