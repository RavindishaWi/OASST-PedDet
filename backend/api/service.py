import subprocess

# This method will generate the results for a single image
def get_results(image_path):
    python_interpreter_path = '../../venv/Scripts/python.exe'
    model_weight_path = '../dino-main/checkpoint.pth'
    script_path = '../dino-main/visualize_attention.py'
    working_directory = '../models/dino-main'

    print('inside the get resutls function')

    command = [python_interpreter_path, script_path, '--image_path', image_path, '--pretrained_weights',
               model_weight_path]
    subprocess.run(command, check=True, cwd=working_directory)
    print('command done')

    return 'done'
