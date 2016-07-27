from subprocess import check_output, check_call, CalledProcessError
import re
import logging
import sys
from pdb import set_trace

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler(sys.stdout))

def __empty_string(arg):
    return re.match(r"^\s*$", arg)

def command_to_list(command_str):
    """
    Takes a command that you could put in on the bash term and executes it.
    :param command_str: The string representing the command to be run.
    :return: A list of results for the command.  A list of unicode strings split up by the \\n character
    """



    try:
        command = command_str.split()
        raw_results = check_output(command)
        unicode_results = raw_results.decode()
        final_list = unicode_results.split("\n")
        if __empty_string(final_list[-1]):
            final_list.pop()

        return final_list
    except CalledProcessError as cpe:
        msg = "command_to_list could not properly process the command: {}"
        msg = msg.format(command_str)
        raise Exception(msg)


def search(search_term):
    command = "apt-cache search {}".format(search_term)
    result_list = command_to_list(command)
    tupled_result_list = [tuple(result.split(" - ")) for result in result_list if result]
    return tupled_result_list


def get_package_names():
    command_str = "apt-cache pkgnames"
    data_list = command_to_list(command_str)
    return data_list


def get_stats():
    """
    Get info about apt cache stats
    :return:
    """
    command = "apt-cache stats"
    results = command_to_list(command)

    patt = r"Total.+?:"

    def get_keys():
        keylist = []
        for line in results:
            key_match = re.search(patt, line)
            if key_match:
                item = key_match.group().rstrip(":")
                keylist.append(item)
        return keylist


    flat_results = "".join(results)
    values = [item for item in re.split(patt, flat_results)
                        if item]

    pairs = zip(get_keys(), values)

    return list(pairs)


def get_package_info(pkg_name):
    cmd_str = "apt-cache show {}".format(pkg_name)
    results = command_to_list(cmd_str)
    return results


def print_list(the_list):
    for item in the_list:
        print(item)


def main():
    stats = get_stats()
    print_list(stats)


if __name__ == '__main__':
    main()