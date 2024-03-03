#lotus/padmasana pose
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
engine.setProperty('voice', 'english+f4')
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
def GiveLabelForLotusPose(left_elbow_angle, right_elbow_angle, left_shoulder_angle, right_shoulder_angle, left_knee_angle, right_knee_angle):
    global prev_label
    label = 'Unknown'
    if left_elbow_angle > 130 and left_elbow_angle < 200 and right_elbow_angle > 130 and right_elbow_angle < 200:
        if left_shoulder_angle > 10 and left_shoulder_angle < 40 and right_shoulder_angle > 10 and right_shoulder_angle < 40:
            if left_knee_angle > 320 and left_knee_angle < 360 and right_knee_angle > 0 and right_knee_angle < 40:
                label = 'Thats it, Perfect Padmasana'
            else:
                label = 'Adjust knee position to achieve Padmasana'
        else:
            label = 'Shoulders should be positioned properly'
    else:
        label = 'Keep your elbows straight'
    
    if(label!=prev_label): 
        speak_label(label)
        prev_label=label
    return label   

def classifyLotusPose(landmarks, output_image, display=False):
    label = 'Unknown Pose'
    color = (0, 0, 255)

    left_elbow_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value], landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value], landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value])
    right_elbow_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value], landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value], landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value])
    left_shoulder_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value], landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value], landmarks[mp_pose.PoseLandmark.LEFT_HIP.value])
    right_shoulder_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value], landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value], landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value])
    left_knee_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.LEFT_HIP.value], landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value], landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value])
    right_knee_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value], landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value], landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value])
    # left_hip_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value], landmarks[mp_pose.PoseLandmark.LEFT_HIP.value], landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value])
    # right_hip_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value], landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value],landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value])
    
    label = GiveLabelForLotusPose(left_elbow_angle, right_elbow_angle, left_shoulder_angle, right_shoulder_angle, left_knee_angle, right_knee_angle)
    if label == 'Thats it, Perfect Padmasana': color = (0, 255, 0)
    else: color = (0, 0, 255)

    cv2.putText(output_image, label, (10, 30), cv2.FONT_HERSHEY_PLAIN, 2, color, 5)

    if display: return output_image
    else: return output_image

def release_resources():
    pose.close()

try: pass
finally: release_resources()