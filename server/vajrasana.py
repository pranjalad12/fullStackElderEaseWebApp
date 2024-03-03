import math
import cv2
import mediapipe as mp
import pyttsx3
from threading import Thread
import queue

mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.3, model_complexity=2)
mp_drawing = mp.solutions.drawing_utils

engine = pyttsx3.init()
def speak_label(label):
    def speak():
        engine.say(label)
        engine.runAndWait()
    t = Thread(target=speak)
    t.start()

def calculateAngle(landmark1, landmark2, landmark3):
    x1, y1, _ = landmark1
    x2, y2, _ = landmark2
    x3, y3, _ = landmark3
    angle = math.degrees(math.atan2(y3 - y2, x3 - x2) - math.atan2(y1 - y2, x1 - x2))
    if angle < 0: angle += 360

    return angle

prev_label = "prev"
def giveLabelForVajrasanaSide(left_elbow_angle, right_elbow_angle, left_knee_angle, right_knee_angle, left_hip_angle, right_hip_angle):
    global prev_label
    label = 'Unknown'
    
    if (left_elbow_angle > 110 and left_elbow_angle < 170) or (right_elbow_angle > 180 and right_elbow_angle < 240):
        if (left_hip_angle > 70 and left_hip_angle < 110) or (right_hip_angle > 250 and right_hip_angle < 290):
            if (left_knee_angle > 0 and left_knee_angle < 100) or (right_knee_angle > 290 and right_knee_angle < 360):
                label = 'Thats it, Perfect Vajrasana'
            else:
                label = 'adjust the angle of both knees for vajrasana'
        else:
            label = 'Keep your back straight with hips at proper angle'
    else:
        label = 'Ensure proper alignment of elbows by keeping them on knees'

    if(label!=prev_label): 
        speak_label(label)
        prev_label=label
    return label  

def classifyVajrasanaPose(landmarks, output_image, display=False):
    label = 'Unknown Pose'
    color = (0, 0, 255)

    left_elbow_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value], landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value], landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value])
    right_elbow_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value], landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value], landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value])
    # left_shoulder_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value], landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value], landmarks[mp_pose.PoseLandmark.LEFT_HIP.value])
    # right_shoulder_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value], landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value], landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value])
    left_knee_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.LEFT_HIP.value], landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value], landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value])
    right_knee_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value], landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value], landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value])
    left_hip_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value], landmarks[mp_pose.PoseLandmark.LEFT_HIP.value], landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value])
    right_hip_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value], landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value],landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value])
    
    # Classify the pose based on the angles
    label = giveLabelForVajrasanaSide(left_elbow_angle,right_elbow_angle, left_knee_angle, right_knee_angle, left_hip_angle, right_hip_angle)
    if label == 'Thats it, Perfect Vajrasana': color = (0,255,0)
    else: color=(0,0,255)

    cv2.putText(output_image, label, (10, 30),cv2.FONT_HERSHEY_PLAIN, 2, color, 5)

    if display: return output_image
    else: return output_image

def release_resources():
    pose.close()

try: pass
finally: release_resources()