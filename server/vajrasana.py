import math
import cv2
import mediapipe as mp
import matplotlib.pyplot as plt
from IPython.display import HTML

mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.3, model_complexity=2)
mp_drawing = mp.solutions.drawing_utils

def calculateAngle(landmark1, landmark2, landmark3):
    x1, y1, _ = landmark1
    x2, y2, _ = landmark2
    x3, y3, _ = landmark3
    angle = math.degrees(math.atan2(y3 - y2, x3 - x2) - math.atan2(y1 - y2, x1 - x2))
    if angle < 0: angle += 360

    return angle

def giveLabelForVajrasanaSide(left_elbow_angle, right_elbow_angle, left_knee_angle, right_knee_angle, left_hip_angle, right_hip_angle):
    label = 'Unknown'
    
    # Check if either left or right elbow angle is within the range
    if (left_elbow_angle > 120 and left_elbow_angle < 180) or (right_elbow_angle > 180 and right_elbow_angle < 240):
        # Check if either left or right hip angle is within the range, indicating a straight back
        if (left_hip_angle > 70 and left_hip_angle < 110) or (right_hip_angle > 250 and right_hip_angle < 290):
            # Check if either left or right knee angle is within the range
            if (left_knee_angle > 0 and left_knee_angle < 100) or (right_knee_angle > 290 and right_knee_angle < 360):
                label = 'VAJRASANA'
            else:
                label = 'ADJUST THE ANGLE OF BOTH KNEES FOR VAJRASANA'
        else:
            label = 'ENSURE A STRAIGHT BACK WITH HIPS AT PROPER ANGLE FOR VAJRASANA'
    else:
        label = 'ENSURE PROPER ALIGNMENT OF ELBOWS FOR VAJRASANA'
    
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
    if label == 'VAJRASANA': color = (0,255,0)
    else: color=(0,0,255)

    cv2.putText(output_image, label, (10, 30),cv2.FONT_HERSHEY_PLAIN, 2, color, 5)

    if display: return output_image
    else: return output_image, label

