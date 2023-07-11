import subprocess

def visualize_attention(image_path, model_weight_path, working_directory):
    python_interpreter_path = '../../../venv/Scripts/python.exe'
    script_path = 'visualize_attention.py'

    # select the model weights depending on the model
    if model == 'model_3':
        model_weight_path = 'checkpoint.pth'
    elif model == 'model_1':
        model_weight_path = 'dino_deitsmall8_pretrain_full_checkpoint.pth'
    elif model == 'model_2':
        model_weight_path = 'pedestrian_checkpoint.pth'
    else:
        raise ValueError(f'Unknown model: {model}')

    command = [python_interpreter_path, script_path, '--image_path', image_path, '--pretrained_weights',
               model_weight_path]
    subprocess.run(command, check=True, cwd=working_directory)

image_path = 'images/image.jpg'
model_weight_path = 'model_3'
working_directory = '.'
visualize_attention(image_path, model_weight_path, working_directory)
