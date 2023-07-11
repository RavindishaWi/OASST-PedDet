import subprocess

def get_results(image_path, model):
    python_interpreter_path = '../../venv/Scripts/python.exe'
    script_path = '../dino-main/visualize_attention.py'
    working_directory = '../models/dino-main'

    # Select the model weights depending on the model
    if model == 'model_3':
        model_weight_path = 'checkpoint.pth'
    elif model == 'model_1':
        model_weight_path = 'dino_deitsmall8_pretrain_full_checkpoint.pth'
    elif model == 'model_2':
        model_weight_path = 'pedestrian_checkpoint.pth'
    else:
        raise ValueError(f'Unknown model: {model}')

    print('inside the get results function')

    command = [python_interpreter_path, script_path, '--image_path', image_path, '--pretrained_weights',
               model_weight_path]
    subprocess.run(command, check=True, cwd=working_directory)

    print('command done')

    return 'done'
