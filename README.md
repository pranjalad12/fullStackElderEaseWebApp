
# Personalized Yoga Guidance for Seniors 🧘

## Overview

Our app leverages cutting-edge technology to enhance the well-being of senior citizens through personalized yoga guidance. We provide a dynamic, responsive yoga experience with real-time feedback in both voice and text. By detecting and analyzing body angles during yoga sessions, our app ensures proper alignment and personalized guidance, fostering a deeper connection between mind and body.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## Key Features:

- Realtime Feedback  🔗 
- Tailored Voice Recommendations 📝 
- Personalised Preferences can be set 🌠
- Interactive Progess Dashboard🌲
- Features that observes your time you spend, no of poses which you did, etc.
- Authentication 🔐 

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## Project Objectives

- **Personalized Yoga Sessions**: Tailored yoga guidance with real-time feedback to correct asanas.
- **Voice Recommendations**: Customized recommendations based on diseases, goals, and pain.
- **Progress Monitoring**: Track user progress with detailed metrics.
- **AI Video Tutor**: Real-time video tutor specifically designed for elders.
- **Future Scope**: Plans to integrate oxygen and heart rate measurements.


![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## Problem Solved

Our app addresses several challenges:
- **Injury Prevention**: Personalized training tailored to users' health history and age-related pains.
- **Accessibility**: Overcoming mobility limitations and travel preferences by offering at-home guidance.
- **Cost**: Providing affordable alternatives to private yoga instructors.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## Technology Stack

- **Next.js**: Server-side rendering and dynamic functionality.
- **Firebase**: User authentication and database management.
- **MediaPipe**: Deep learning model for body landmark detection and tracking.
- **pyttsx3**: Text-to-speech library for real-time voice feedback.
- **Flask**: API management and hosting.
- **OpenCV**: Real-time video processing.
- **Recharts**: Graphical progress presentation using bar charts.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

### Frontend

- **Next.js Framework**: Comprehensive web application development.
- **Design and Styling**: Tailwind CSS and Material UI.
- **Animation**: Integrated Framer Motion and Sliders.
- **Data Visualization**: Bar charts for progress display.
- **Authentication**: Firebase authentication with Google Sign-In.
- **Protected Routes**: Restrict unauthorized access to sensitive content.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

### Backend

- **Flask Server**: Handles HTTP requests and responses.
- **Pose Detection**: Mediapipe Pose model for analyzing body angles.
- **Real-Time Processing**: Captures and processes video frames with pose detection algorithms.
- **Dynamic Endpoints**: `/tPoseVideo` for real-time video stream.
- **Multithreading**: Asynchronous speech synthesis and text annotation for real-time feedback.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

### Database

- **Firebase Integration**: Secure data storage and retrieval.
- **User Preferences**: Mapped to yoga poses for personalized recommendations.

#### Schema

**User Table**

| Field                | Type    |
|----------------------|---------|
| userID               | String  |
| email                | String  |
| painAreas            | Array   |
| username             | String  |
| motive               | Array   |
| diseases             | Array   |
| timeSpentPerDay      | Number  |
| noOfPosesInADay      | Number  |
| noOfPosesAllTime     | Number  |

**YogaPose Table**

| Field         | Type    |
|---------------|---------|
| Name          | String  |
| Aim           | Array   |
| Benefits      | Array   |
| Description   | String  |
| Diseases      | Array   |
| PainAreas     | Array   |
| PhotoURL      | String  |


![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## Future Scope

Our solution aims to be inclusive and adaptable, with plans to:
- Add specialized routines for women during menstruation.
- Integrate smartwatch technology to monitor vital signs.
- Extend support for various languages to reach a broader audience.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## Getting Started

To get started with our app, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/pranjalad12/fullStackElderEaseWebApp
    ```

2. **Navigate to the project directory:**

    ```bash
    cd fullStackElderEaseWebApp
    ```

3. **Install frontend dependencies:**

    ```bash
    npm i
    ```

4. **Start the frontend application:**

    ```bash
    npx run dev
    ```

5. **Navigate to the server directory:**

    ```bash
    cd server
    ```

6. **Create a virtual environment:**

    ```bash
    python3 -m venv venv
    ```

7. **Activate the virtual environment:**

    - **On macOS/Linux:**

        ```bash
        source venv/bin/activate
        ```

    - **On Windows:**

        ```bash
        venv\Scripts\activate
        ```

8. **Install server-side dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

9. **Start the server:**

    ```bash
    python3 server.py
    ```

## Prerequisites

- **Node version 18.x.x**
- **Python 3.x**

Make sure you have the necessary versions of Node.js and Python installed before proceeding with the setup.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## Workflows

### Functional Workflow

<img width="816" alt="Screenshot 2024-08-04 at 12 31 21 AM" src="https://github.com/user-attachments/assets/1a1adce2-d234-4dbb-ba33-056376d2d0ef">

<br>

### Backend Workflow

<img width="816" alt="Screenshot 2024-08-04 at 12 32 04 AM" src="https://github.com/user-attachments/assets/4ba5a731-5db1-4241-b45d-3b74b8e0ede7">

