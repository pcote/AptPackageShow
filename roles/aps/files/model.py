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
        raw_results = check_output(command, shell=False)
        unicode_results = raw_results.decode()
        final_list = unicode_results.split("\n")
        if __empty_string(final_list[-1]):
            final_list.pop()

        return final_list
    except CalledProcessError as cpe:
        msg = "command_to_list could not properly process the command: {}"
        msg = msg.format(command_str)
        logger.error(msg)
        raise Exception(msg)


def search(search_term):
    command = "/usr/bin/apt-cache search {}".format(search_term)
    result_list = command_to_list(command)
    # TODO: This is downright ugly and does too much.  Needs splitting up
    tupled_result_list = [tuple(result.split(" - ")[:2])
                            for result in result_list
                                if result]

    dict_list = [dict(package=pkg, description=desc) for pkg, desc in tupled_result_list]
    return dict_list


def get_package_names():
    command_str = "/usr/bin/apt-cache pkgnames"
    data_list = command_to_list(command_str)
    return data_list


def get_stats():
    """
    Get info about apt cache stats
    :return:
    """
    command = "/usr/bin/apt-cache stats"
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
    dict_list = [dict(name=k, val=v) for k, v in pairs]

    return dict_list


def get_package_info(pkg_name):
    cmd_str = "/usr/bin/apt-cache show {}".format(pkg_name)
    lines = command_to_list(cmd_str)
    match_patt = r"^\w.+?:.+$"
    search_patt = r"\w.+?:"

    proper_lines = [line for line in lines if re.match(match_patt, line)]

    pair_list = []
    for line in proper_lines:
        key_search_result = re.search(search_patt, line)
        key_name = key_search_result.group().rstrip(": ")
        value_split_result = re.split(search_patt, line, maxsplit=1)
        value = value_split_result[1]
        pair = (key_name, value)
        pair_list.append(pair)

    dict_list = [dict(name=name, val=val) for name, val in pair_list]
    return dict_list


def print_list(the_list):
    for item in the_list:
        print(item)


def main():
    lines = get_package_info("blender")
    for line in lines:
        print(line)


if __name__ == '__main__':
    main()
