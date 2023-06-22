import subprocess


def visualize_attention(image_path, model_weight_path, working_directory):
    python_interpreter_path = '../../../venv/Scripts/python.exe'  # update this path
    script_path = 'visualize_attention.py'

    command = [python_interpreter_path, script_path, '--image_path', image_path, '--pretrained_weights',
               model_weight_path]
    subprocess.run(command, check=True, cwd=working_directory)


# Example usage
image_path = 'images/foggy.jpg'
model_weight_path = 'checkpoint.pth'
working_directory = '.'
visualize_attention(image_path, model_weight_path, working_directory)



