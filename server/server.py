from flask import Flask, Response, jsonify
from flask_cors import CORS
import cv2
import mediapipe as mp
from tpose import classifyTPose
from treepose import classifyTreePose
from warrior import classifyWarriorPose

app = Flask(__name__)
CORS(app)

mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.3, model_complexity=2)
mp_drawing = mp.solutions.drawing_utils

def detectPose(image):
    imageRGB = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = pose.process(imageRGB)
    landmarks = []
    if results.pose_landmarks:
        for landmark in results.pose_landmarks.landmark:
            landmarks.append((int(landmark.x * image.shape[1]), int(landmark.y * image.shape[0]), int(landmark.z * image.shape[1])))
    return landmarks

def TPose(landmarks, output_image):
    color = (0, 0, 255)
    output_image, label = classifyTPose(landmarks, output_image, False)

    if label == 'T Pose': color = (0,255,0)

    output_image = cv2.putText(output_image, label, (10, 30), cv2.FONT_HERSHEY_PLAIN, 2, color, 5)
    _, jpeg = cv2.imencode('.jpg', output_image)
    return jpeg.tobytes()

def generateFramesTPose():
    cap = cv2.VideoCapture(0)
    while True:

        success, frame = cap.read()
        if not success:
            break
        frame = cv2.resize(frame, (0, 0), fx=1.7, fy=1.7)
        landmarks = detectPose(frame)
        if landmarks:
            output_image = TPose(landmarks, frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + output_image + b'\r\n')
        else:
            _, jpeg = cv2.imencode('.jpg', frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')

    cap.release()

def treePose(landmarks, output_image):
    color = (0, 0, 255)
    output_image, label = classifyTreePose(landmarks, output_image, False)

    if label == 'T Pose': color = (0,255,0)

    output_image = cv2.putText(output_image, label, (10, 30), cv2.FONT_HERSHEY_PLAIN, 2, color, 5)
    _, jpeg = cv2.imencode('.jpg', output_image)
    return jpeg.tobytes()

def generateFramesTreePose():
    cap = cv2.VideoCapture(0)
    while True:

        success, frame = cap.read()
        if not success:
            break
        frame = cv2.resize(frame, (0, 0), fx=1.7, fy=1.7)
        landmarks = detectPose(frame)
        if landmarks:
            output_image = treePose(landmarks, frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + output_image + b'\r\n')
        else:
            _, jpeg = cv2.imencode('.jpg', frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')

    cap.release()

def warriorPose(landmarks, output_image):
    color = (0, 0, 255)
    output_image, label = classifyWarriorPose(landmarks, output_image, False)

    if label == 'T Pose': color = (0,255,0)

    output_image = cv2.putText(output_image, label, (10, 30), cv2.FONT_HERSHEY_PLAIN, 2, color, 5)
    _, jpeg = cv2.imencode('.jpg', output_image)
    return jpeg.tobytes()

def generateFramesWarriorPose():
    cap = cv2.VideoCapture(0)
    while True:

        success, frame = cap.read()
        if not success:
            break
        frame = cv2.resize(frame, (0, 0), fx=1.7, fy=1.7)
        landmarks = detectPose(frame)
        if landmarks:
            output_image = warriorPose(landmarks, frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + output_image + b'\r\n')
        else:
            _, jpeg = cv2.imencode('.jpg', frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')

    cap.release()

@app.route("/")
def default():
    return jsonify({
        "home" : "idk"
    })

@app.route('/tPoseVideo')
def video_feed_t():
    return Response(generateFramesTPose(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/treePoseVideo')
def video_feed_tree():
    return Response(generateFramesTreePose(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/warriorPoseVideo')
def video_feed_warrior():
    return Response(generateFramesWarriorPose(), mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == "__main__":
    app.run(debug=True, port=8080) 

