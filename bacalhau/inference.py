import argparse
import torch
from transformers import pipeline

def main(input_prompt, model_version):
    # Fixed prompt to be appended
    fixed_prompt = "Generate a 4 line poem based on the plot - "

    # Combine the fixed prompt and the input prompt
    prompt_string = fixed_prompt + input_prompt

    # Use dolly-v2-12b if you're using Colab Pro+, using pythia-2.8b for Free Colab
    generate_text = pipeline(model=model_version, 
                             torch_dtype=torch.bfloat16, 
                             trust_remote_code=True,
                             device_map="auto")

    print(generate_text(prompt_string))

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--prompt", type=str, required=True, help="The prompt to be used in the GPT model")
    parser.add_argument("--model_version", type=str, default="./databricks/dolly-v2-12b", help="The model version to be used")
    args = parser.parse_args()
    main(args.prompt, args.model_version)
