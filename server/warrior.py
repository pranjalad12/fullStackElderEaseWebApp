import math
import cv2
import mediapipe as mp
import pyttsx3

mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.3, model_complexity=2)
mp_drawing = mp.solutions.drawing_utils

engine = pyttsx3.init()
def speak_label(label):
    engine.say(label)
    engine.runAndWait()


def calculateAngle(landmark1, landmark2, landmark3):
    x1, y1, _ = landmark1
    x2, y2, _ = landmark2
    x3, y3, _ = landmark3
    angle = math.degrees(math.atan2(y3 - y2, x3 - x2) - math.atan2(y1 - y2, x1 - x2))
    if angle < 0: angle += 360

    return angle

prev_label = "prev"
def classifyWarriorPose(landmarks, output_image, display=False):
   
    label = 'Unknown Pose'
    color = (0, 0, 255)
    
    left_elbow_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value], landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value], landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value])
    right_elbow_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value], landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value], landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value])   
    left_shoulder_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value],  landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value], landmarks[mp_pose.PoseLandmark.LEFT_HIP.value])
    right_shoulder_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value], landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value], landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value])
    left_knee_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.LEFT_HIP.value], landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value], landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value])
    right_knee_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value], landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value], landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value])
    
    if left_elbow_angle > 165 and left_elbow_angle < 195 and right_elbow_angle > 165 and right_elbow_angle < 195:
        if left_shoulder_angle > 70 and left_shoulder_angle < 120 and right_shoulder_angle > 70 and right_shoulder_angle < 120:
            if left_knee_angle > 150 and left_knee_angle < 215 or right_knee_angle > 150 and right_knee_angle < 215:
               if left_knee_angle > 105 and left_knee_angle < 135 or right_knee_angle > 105 and right_knee_angle < 135:
                    label = 'Thats it, Perfect Warrior Pose'
               else:
                    label='Bend your knees a little bit outwards for Warrior II pose'
        else:
            label='Both left and right shoulders should be straight out at 90° with the waist.'
    else:
        label='Elbows should be at 90deg with arms'
    
    global prev_label
    if(label!=prev_label): 
        speak_label(label)
        prev_label=label

    if label == 'Thats it, Perfect Warrior Pose': color = (0,255,0)
    else: color=(0,0,255)  
    
    cv2.putText(output_image, label, (10, 30),cv2.FONT_HERSHEY_PLAIN, 2, color, 3)
    
    if display: return output_image
    else: return output_image, label