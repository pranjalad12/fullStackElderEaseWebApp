from flask import Flask, Response, jsonify
from flask_cors import CORS
import cv2
import mediapipe as mp
from tpose import classifyTPose
from treepose import classifyTreePose
from warrior import classifyWarriorPose
from vajrasana import classifyVajrasanaPose
from plank import classifyPlankPose
from padmasana import classifyLotusPose
from bhujangasana import classifyCobraPose
from toeTouch import classifyToeTouchPose
from backBend import classifyBackBendPose
from balasana import classifyBalasanaPose
# from corpse import classifyCorpsePose

#initialisation
app = Flask(__name__)
CORS(app)

mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.3, model_complexity=2)
mp_drawing = mp.solutions.drawing_utils

#detection
def detectPose(image):
    imageRGB = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = pose.process(imageRGB)
    landmarks = []
    if results.pose_landmarks:
        for landmark in results.pose_landmarks.landmark:
            landmarks.append((int(landmark.x * image.shape[1]), int(landmark.y * image.shape[0]), int(landmark.z * image.shape[1])))
    return landmarks

#tpose
def TPose(landmarks, output_image):
    output_image = classifyTPose(landmarks, output_image, False)
    _, jpeg = cv2.imencode('.jpg', output_image)
    return jpeg.tobytes()
def generateFramesTPose():
    cap = cv2.VideoCapture(0)
    while True:

        success, frame = cap.read()
        if not success:
            break
        # frame = cv2.resize(frame, (0, 0), fx=1.7, fy=1.7)
        landmarks = detectPose(frame)
        if landmarks:
            output_image = TPose(landmarks, frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + output_image + b'\r\n')
        else:
            _, jpeg = cv2.imencode('.jpg', frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')

    cap.release()

#treePose
def treePose(landmarks, output_image):
    output_image = classifyTreePose(landmarks, output_image, False)
    _, jpeg = cv2.imencode('.jpg', output_image)
    return jpeg.tobytes()
def generateFramesTreePose():
    cap = cv2.VideoCapture(0)
    while True:

        success, frame = cap.read()
        if not success:
            break
        # frame = cv2.resize(frame, (0, 0), fx=1.7, fy=1.7)
        landmarks = detectPose(frame)
        if landmarks:
            output_image = treePose(landmarks, frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + output_image + b'\r\n')
        else:
            _, jpeg = cv2.imencode('.jpg', frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')

    cap.release()

#warrior
def warriorPose(landmarks, output_image):
    output_image = classifyWarriorPose(landmarks, output_image, False)
    _, jpeg = cv2.imencode('.jpg', output_image)
    return jpeg.tobytes()
def generateFramesWarriorPose():
    cap = cv2.VideoCapture(0)
    while True:

        success, frame = cap.read()
        if not success:
            break
        # frame = cv2.resize(frame, (0, 0), fx=1.7, fy=1.7)
        landmarks = detectPose(frame)
        if landmarks:
            output_image = warriorPose(landmarks, frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + output_image + b'\r\n')
        else:
            _, jpeg = cv2.imencode('.jpg', frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')

    cap.release()

# #vajrasana
def vajrasanaPose(landmarks, output_image):
    output_image = classifyVajrasanaPose(landmarks, output_image, False)
    _, jpeg = cv2.imencode('.jpg', output_image)
    return jpeg.tobytes()
def generateFramesVajrasanaPose():
    cap = cv2.VideoCapture(0)
    while True:

        success, frame = cap.read()
        if not success:
            break
        # frame = cv2.resize(frame, (0, 0), fx=1.7, fy=1.7)
        landmarks = detectPose(frame)
        if landmarks:
            output_image = vajrasanaPose(landmarks, frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + output_image + b'\r\n')
        else:
            _, jpeg = cv2.imencode('.jpg', frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')

    cap.release()

# #plank pose
def plankPose(landmarks, output_image):
    output_image = classifyPlankPose(landmarks, output_image, False)
    _, jpeg = cv2.imencode('.jpg', output_image)
    return jpeg.tobytes()
def generateFramesPlankPose():
    cap = cv2.VideoCapture(0)
    while True:

        success, frame = cap.read()
        if not success:
            break
        # frame = cv2.resize(frame, (0, 0), fx=1.7, fy=1.7)
        landmarks = detectPose(frame)
        if landmarks:
            output_image = plankPose(landmarks, frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + output_image + b'\r\n')
        else:
            _, jpeg = cv2.imencode('.jpg', frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')

    cap.release()

# #lotus pose
def lotusPose(landmarks, output_image):
    output_image = classifyLotusPose(landmarks, output_image, False)
    _, jpeg = cv2.imencode('.jpg', output_image)
    return jpeg.tobytes()
def generateFramesLotusPose():
    cap = cv2.VideoCapture(0)
    while True:

        success, frame = cap.read()
        if not success:
            break
        # frame = cv2.resize(frame, (0, 0), fx=1.7, fy=1.7)
        landmarks = detectPose(frame)
        if landmarks:
            output_image = lotusPose(landmarks, frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + output_image + b'\r\n')
        else:
            _, jpeg = cv2.imencode('.jpg', frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')

    cap.release()

# #cobra pose
def cobraPose(landmarks, output_image):
    output_image = classifyCobraPose(landmarks, output_image, False)
    _, jpeg = cv2.imencode('.jpg', output_image)
    return jpeg.tobytes()
def generateFramesCobraPose():
    cap = cv2.VideoCapture(0)
    while True:

        success, frame = cap.read()
        if not success:
            break
        # frame = cv2.resize(frame, (0, 0), fx=1.7, fy=1.7)
        landmarks = detectPose(frame)
        if landmarks:
            output_image = cobraPose(landmarks, frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + output_image + b'\r\n')
        else:
            _, jpeg = cv2.imencode('.jpg', frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')

    cap.release()

# #toe touch
def toeTouchPose(landmarks, output_image):
    output_image = classifyToeTouchPose(landmarks, output_image, False)
    _, jpeg = cv2.imencode('.jpg', output_image)
    return jpeg.tobytes()
def generateFramesToeTouchPose():
    cap = cv2.VideoCapture(0)
    while True:

        success, frame = cap.read()
        if not success:
            break
        # frame = cv2.resize(frame, (0, 0), fx=1.7, fy=1.7)
        landmarks = detectPose(frame)
        if landmarks:
            output_image = toeTouchPose(landmarks, frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + output_image + b'\r\n')
        else:
            _, jpeg = cv2.imencode('.jpg', frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')

    cap.release()

# #backBend
def backBendPose(landmarks, output_image):
    output_image = classifyBackBendPose(landmarks, output_image, False)
    _, jpeg = cv2.imencode('.jpg', output_image)
    return jpeg.tobytes()
def generateFramesBackBendPose():
    cap = cv2.VideoCapture(0)
    while True:

        success, frame = cap.read()
        if not success:
            break
        # frame = cv2.resize(frame, (0, 0), fx=1.7, fy=1.7)
        landmarks = detectPose(frame)
        if landmarks:
            output_image = backBendPose(landmarks, frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + output_image + b'\r\n')
        else:
            _, jpeg = cv2.imencode('.jpg', frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')

    cap.release()

# # #balasana
def balasanaPose(landmarks, output_image):
    output_image = classifyBalasanaPose(landmarks, output_image, False)
    _, jpeg = cv2.imencode('.jpg', output_image)
    return jpeg.tobytes()
def generateFramesBalasanaPose():
    cap = cv2.VideoCapture(0)
    while True:

        success, frame = cap.read()
        if not success:
            break
        # frame = cv2.resize(frame, (0, 0), fx=1.7, fy=1.7)
        landmarks = detectPose(frame)
        if landmarks:
            output_image = balasanaPose(landmarks, frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + output_image + b'\r\n')
        else:
            _, jpeg = cv2.imencode('.jpg', frame)
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')

    cap.release()

# #corpse pose
# def corpsePose(landmarks, output_image):
#     output_image = classifyCorpsePose(landmarks, output_image, False)
#     _, jpeg = cv2.imencode('.jpg', output_image)
#     return jpeg.tobytes()
# def generateFramesCorpsePose():
#     cap = cv2.VideoCapture(0)
#     while True:

#         success, frame = cap.read()
#         if not success:
#             break
#         # frame = cv2.resize(frame, (0, 0), fx=1.7, fy=1.7)
#         landmarks = detectPose(frame)
#         if landmarks:
#             output_image = corpsePose(landmarks, frame)
#             yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + output_image + b'\r\n')
#         else:
#             _, jpeg = cv2.imencode('.jpg', frame)
#             yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')

#     cap.release()

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

@app.route('/vajrasanaPoseVideo')
def video_feed_vajrasana():
    return Response(generateFramesVajrasanaPose(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/plankPoseVideo')
def video_feed_plank():
    return Response(generateFramesPlankPose(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/lotusPoseVideo')
def video_feed_lotus():
    return Response(generateFramesLotusPose(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/cobraPoseVideo')
def video_feed_cobra():
    return Response(generateFramesCobraPose(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/toeTouchPoseVideo')
def video_feed_toe_touch():
    return Response(generateFramesToeTouchPose(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/backBendPoseVideo')
def video_feed_back_bend():
    return Response(generateFramesBackBendPose(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/balasanaPoseVideo')
def video_feed_balasana():
    return Response(generateFramesBalasanaPose(), mimetype='multipart/x-mixed-replace; boundary=frame')

# @app.route('/corpsePoseVideo')
# def video_feed_corpse():
#     return Response(generateFramesCorpsePose(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(debug=True, port=8080) 

