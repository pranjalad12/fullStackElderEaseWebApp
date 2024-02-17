import math
import cv2
import mediapipe as mp
import matplotlib.pyplot as plt
from IPython.display import HTML

mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.3, model_complexity=2)
mp_drawing = mp.solutions.drawing_utils

# def detectPose(image, pose, display=True):
#     output_image = image.copy()
#     imageRGB = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
#     results = pose.process(imageRGB)
#     height, width, _ = image.shape
#     landmarks = []
#     if results.pose_landmarks:
#         mp_drawing.draw_landmarks(image=output_image, landmark_list=results.pose_landmarks,connections=mp_pose.POSE_CONNECTIONS)
#         for landmark in results.pose_landmarks.landmark:
#             landmarks.append((int(landmark.x * width), int(landmark.y * height), (landmark.z * width)))
#     if display:
#         plt.figure(figsize=[22,22])
#         plt.subplot(121);plt.imshow(image[:,:,::-1]);plt.title("Original Image");plt.axis('off');
#         plt.subplot(122);plt.imshow(output_image[:,:,::-1]);plt.title("Output Image");plt.axis('off');
#         mp_drawing.plot_landmarks(results.pose_world_landmarks, mp_pose.POSE_CONNECTIONS)
#     else:
#         return output_image, landmarks


def calculateAngle(landmark1, landmark2, landmark3):
    x1, y1, _ = landmark1
    x2, y2, _ = landmark2
    x3, y3, _ = landmark3
    angle = math.degrees(math.atan2(y3 - y2, x3 - x2) - math.atan2(y1 - y2, x1 - x2))
    if angle < 0: angle += 360

    return angle

def GiveLabelForTPose(left_elbow_angle, right_elbow_angle, left_shoulder_angle, right_shoulder_angle, left_knee_angle, right_knee_angle):
    label = 'Unknown'
    if left_elbow_angle > 165 and left_elbow_angle < 195 and right_elbow_angle > 165 and right_elbow_angle < 195:
        if left_shoulder_angle > 80 and left_shoulder_angle < 110 and right_shoulder_angle > 80 and right_shoulder_angle < 110:
            if left_knee_angle > 160 and left_knee_angle < 195 and right_knee_angle > 160 and right_knee_angle < 195:
                label = 'T Pose'
            else:
                label='Straighten up your knees a little and you will be doing T Pose!'
        else:
            label='Both left and right shoulders should be straight out at 90 degrees with the waist.'
    else:
        label='Elbows should be at 90 degrees with arms'
    
    return label  

def classifyPoseTemp(landmarks, output_image, display=False):
    label = 'Unknown Pose'
    color = (0, 0, 255)

    left_elbow_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value], landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value], landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value])
    right_elbow_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value], landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value], landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value])
    left_shoulder_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value], landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value], landmarks[mp_pose.PoseLandmark.LEFT_HIP.value])
    right_shoulder_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value], landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value], landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value])
    left_knee_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.LEFT_HIP.value], landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value], landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value])
    right_knee_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value], landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value], landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value])

    label = GiveLabelForTPose(left_elbow_angle, right_elbow_angle, left_shoulder_angle, right_shoulder_angle, left_knee_angle, right_knee_angle)
    if label == 'T Pose': color = (0,255,0)
    else: color=(0,0,255)

    cv2.putText(output_image, label, (10, 30),cv2.FONT_HERSHEY_PLAIN, 2, color, 5)

    if display: return output_image
    else: return output_image, label

# cap = cv2.VideoCapture(0)

# while True:
#     ret, frame = cap.read()
#     frame = cv2.resize(frame, (0, 0), fx=1.7, fy=1.7)
#     output_image, landmarks = detectPose(frame, pose, display=False)

#     if landmarks:
#         imgg = classifyPose(landmarks, output_image, display=True)
#         cv2.imshow('frame', imgg)
#     else:
#         cv2.imshow('frame', frame)  

#     if cv2.waitKey(1) == ord('q'):
#         break

# cap.release()
# cv2.destroyAllWindows()


